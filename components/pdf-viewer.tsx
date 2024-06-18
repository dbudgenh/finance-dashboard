"use client";

import { useCallback, useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import { Button } from "./ui/button";
import { Loader, LoaderCircle } from "lucide-react";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { Input } from "./ui/input";
import { PDFDocumentProxy } from "pdfjs-dist/types/src/display/api";
import React from "react";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

type PDFFile = string | File | null;

type PdfViewerProps = {
  file: PDFFile | undefined;
};

type SearchCriteria = {
  match: string;
  regex: string;
  color: string;
};

export const PdfViewer = ({ file }: PdfViewerProps) => {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria[]>([]);
  const [pageText, setPageText] = useState<string>("");

  const onDocumentLoadSuccess = (pdf: PDFDocumentProxy): void => {
    setNumPages(pdf.numPages);
  };

  const onPageLoadSuccess = async (page: any): Promise<void> => {
    const textContent = await page.getTextContent();
    const textItems = textContent.items.map((item: any) => item.str);
    const text = textItems.join(" ");
    setPageText(text);
    console.log("Page text: ", text);
  };

  const onLoadStart = (): void => {
    setLoading(true);
  };

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const getRandomColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };

  const addSearchCriteria = () => {
    if (searchText.trim() !== "") {
      // find the search text in the page text, and return the first group that matches
      const randomColor = getRandomColor();
      const regex = new RegExp(searchText, "gm");
      const allMatches: RegExpExecArray[] = [];
      const matches: string[] = [];
      let match: RegExpExecArray | null;

      while ((match = regex.exec(pageText)) !== null) {
        allMatches.push(match); // Add the matched value to the array
      }

      for (const m of allMatches) {
        if (m[1]) {
          matches.push(m[1]);
        } else {
          matches.push(m[0]);
        }
      }
      console.log("Matches: ", matches);
      // Collect new search criteria
      const newSearchCriteria = matches.map((match) => ({
        regex: searchText,
        match: match,
        color: randomColor,
      }));
      setSearchCriteria((prev) => [...prev, ...newSearchCriteria]); //\d{2}\.\d{2}
      setSearchText("");
    }
  };

  const highlightPattern = (
    text: string,
    criteria: SearchCriteria[]
  ): string => {
    let highlightedText = text;
    console.log("Highlighting text: ", highlightedText);
    const placeholder = "__HIGHLIGHT_PLACEHOLDER__";
    const highlights: string[] = [];

    // Replace existing <mark> tags with placeholders
    highlightedText = highlightedText.replace(
      /<mark[^>]*>(.*?)<\/mark>/g,
      (match) => {
        highlights.push(match);
        return placeholder;
      }
    );

    // Sort criteria by the length of the text in descending order
    criteria.sort((a, b) => b.match.length - a.match.length);

    const appliedHighlights: { start: number; end: number }[] = [];

    criteria.forEach(({ match: pattern, color }) => {
      const regex = new RegExp(pattern, "gm");
      let match: RegExpExecArray | null;

      while ((match = regex.exec(highlightedText)) !== null) {
        const start = match.index;
        const end = regex.lastIndex;

        // Check for overlap with existing highlights
        if (!appliedHighlights.some((h) => start < h.end && end > h.start)) {
          const highlightedMatch = `<mark style="background-color: ${color};">${match[0]}</mark>`;

          highlightedText =
            highlightedText.slice(0, start) +
            highlightedMatch +
            highlightedText.slice(end);

          appliedHighlights.push({
            start,
            end: start + highlightedMatch.length,
          });

          // Adjust regex.lastIndex due to text length change
          regex.lastIndex = start + highlightedMatch.length;
        }
      }
    });

    // Restore original highlights
    let highlightIndex = 0;
    highlightedText = highlightedText.replace(
      new RegExp(placeholder, "g"),
      () => {
        return highlights[highlightIndex++];
      }
    );

    return highlightedText;
  };

  const textRenderer = useCallback(
    (textItem: { str: string; itemIndex: number }) =>
      highlightPattern(textItem.str, searchCriteria),
    [searchCriteria]
  );

  if (!file) {
    return <></>;
  }

  const groupedCriteria = searchCriteria.reduce((acc, criterion) => {
    if (!acc[criterion.regex]) {
      acc[criterion.regex] = [];
    }
    acc[criterion.regex].push(criterion);
    return acc;
  }, {} as Record<string, SearchCriteria[]>);

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex gap-x-2">
        <Input
          value={searchText}
          onChange={onSearchChange}
          placeholder="Enter your regex here, e.g. \d{2}\.\d{2}\.\d{4}"
        />
        <Button onClick={addSearchCriteria}>Add</Button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Regex</th>
              <th className="py-2 px-4 border-b">Match</th>
              <th className="py-2 px-4 border-b">Remove</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(groupedCriteria).map((regex) => (
              <React.Fragment key={regex}>
                {groupedCriteria[regex].map((criterion, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b">{regex}</td>
                    <td
                      className="py-2 px-4 border-b"
                      style={{ backgroundColor: criterion.color }}
                    >
                      {criterion.match}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setSearchCriteria((prev) =>
                            prev.filter((c) => c !== criterion)
                          )
                        }
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <div className="h-screen overflow-auto">
        <Document
          noData={<p>No PDF file selected.</p>}
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadStart={onLoadStart}
          loading={"Loading document..."}
        >
          <Page
            pageNumber={pageNumber}
            loading={"Loading page..."}
            customTextRenderer={textRenderer}
            onLoadSuccess={onPageLoadSuccess}
          />
        </Document>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {"Page "}
            {pageNumber} of {numPages} page(s) selected.
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPageNumber((prev) => prev - 1)}
            disabled={pageNumber <= 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPageNumber((prev) => prev + 1)}
            disabled={pageNumber >= numPages!}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
