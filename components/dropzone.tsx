"use client";
import { cn } from "@/lib/utils";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

type DropzoneProps = {
  onDrop: (files: File[]) => void;
};

export const Dropzone = ({ onDrop }: DropzoneProps) => {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
    fileRejections,
  } = useDropzone({
    onDrop,
    maxFiles: 10,
    accept: {
      // "image/*": [
      //   ".jpg",
      //   ".jpeg",
      //   ".png",
      //   ".webp",
      //   ".avif",
      //   ".gif",
      //   ".tif",
      //   ".tiff",
      // ],
      "document/*": [".pdf"], //, ".doc", ".docx", ".xls", ".xlsx"
    },
  });

  const acceptedFileItems = acceptedFiles.map((file) => (
    <li key={file.name} className="text-green-700">
      {file.name} - {file.size} bytes
    </li>
  ));

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.name} className="text-red-700">
      {file.name} - {file.size} bytes
      <ul>
        {errors.map((e) => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={cn(
          "flex justify-center items-center p-6 border-2 border-dashed rounded-md transition focus:border-blue-500 focus:bg-blue-100",
          {
            "border-blue-500 bg-blue-100": isDragActive,
            "border-gray-300 bg-white": !isDragActive,
          }
        )}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-blue-700">Drop the files here...</p>
        ) : (
          <p className="text-gray-700">
            Drag 'n' drop some files here, or click to select files
          </p>
        )}
      </div>
      <aside>
        <h4 className="text-lg font-semibold">Accepted files</h4>
        <ul>{acceptedFileItems}</ul>
        <h4 className="text-lg font-semibold">Rejected files</h4>
        <ul>{fileRejectionItems}</ul>
      </aside>
    </div>
  );
};
