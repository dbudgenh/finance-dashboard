"use client";

import { DragEvent, ChangeEvent, useState } from "react";

export const FileUpload = () => {
  const [file, setFile] = useState<string | null>(null);
  const [fileEnter, setFileEnter] = useState(false);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setFileEnter(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    setFileEnter(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setFileEnter(false);
    const items = e.dataTransfer.items;
    if (items) {
      Array.from(items).forEach((item, i) => {
        if (item.kind === "file") {
          const file = item.getAsFile();
          if (file) {
            const blobUrl = URL.createObjectURL(file);
            setFile(blobUrl);
            console.log(`items file[${i}].name = ${file.name}`);
          }
        }
      });
    } else {
      Array.from(e.dataTransfer.files).forEach((file, i) => {
        console.log(`file[${i}].name = ${file.name}`);
      });
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let files = e.target.files;
    if (files && files[0]) {
      let blobUrl = URL.createObjectURL(files[0]);
      setFile(blobUrl);
    }
  };

  return (
    <div className="container px-4 max-w-5xl mx-auto">
      {!file ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`${
            fileEnter ? "border-4" : "border-2"
          } mx-auto bg-white flex flex-col w-full max-w-xs h-72 border-dashed items-center justify-center`}
        >
          <label
            htmlFor="file"
            className="h-full flex flex-col justify-center text-center cursor-pointer"
          >
            Click to upload or drag and drop
          </label>
          <input
            id="file"
            type="file"
            className="hidden"
            onChange={handleChange}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <object
            className="rounded-md w-full max-w-xs h-72"
            data={file}
            type="image/png" // Update based on the type of file
          />
          <button
            onClick={() => setFile(null)}
            className="px-4 mt-10 uppercase py-2 tracking-widest outline-none bg-red-600 text-white rounded"
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
};
