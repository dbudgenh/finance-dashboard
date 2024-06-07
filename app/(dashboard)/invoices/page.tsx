"use client";

import { Dropzone } from "@/components/dropzone";
import { FileUploader } from "@/components/file-uploader";
import { PdfViewer } from "@/components/pdf-viewer";
import { UploadedFilesCard } from "@/components/uploaded-files-card";
import { FileUp } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
const InvoicesPage = () => {
  //set the state for the files
  const [files, setFiles] = useState<File[]>([]);
  const [chosenFile, setChosenFile] = useState<File | null>(null);
  const [progresses, setProgresses] = useState<Record<string, number>>({});

  const onUpload = async (files: File[]) => {
    try {
      for (const file of files) {
        // Simulate file upload and update progress
        const fileName = file.name;
        for (let progress = 0; progress <= 100; progress += 10) {
          await new Promise((resolve) => setTimeout(resolve, 100));
          setProgresses((prev) => ({ ...prev, [fileName]: progress }));
        }
      }
      toast.success("Files uploaded successfully");
    } catch (error) {
      toast.error("Failed to upload files");
    }
  };

  return (
    <>
      <FileUploader
        setChosenFile={setChosenFile}
        progresses={progresses}
        onUpload={onUpload}
        value={files}
        onValueChange={setFiles}
        maxFiles={5}
        multiple
        accept={{ "application/pdf": [] }}
      />
      <PdfViewer file={chosenFile} />
    </>
  );
};

export default InvoicesPage;
