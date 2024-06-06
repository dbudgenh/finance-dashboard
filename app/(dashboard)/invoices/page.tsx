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

  return (
    <>
      <FileUploader
        setChosenFile={setChosenFile}
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
