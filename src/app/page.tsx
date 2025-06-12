"use client";

import { useState } from "react";
import { UploadDropzone } from "@uploadthing/react";
import type { OurFileRouter } from "./api/uploadthing/core";
import "../styles/globals.css";

export default function Home() {
  const [files, setFiles] = useState<any[]>([]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
      <div className="max-w-lg w-full bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Upload Your Files</h1>
        <p className="text-gray-600 text-sm text-center mb-6">
          Drop up to 15 documents for VaultScan to analyze duplicates, PII, and more.
        </p>

        <UploadDropzone<OurFileRouter, "fileUploader">
          endpoint="fileUploader"
          onClientUploadComplete={(res) => {
            setFiles(res);
            alert("✅ Upload complete!");
          }}
          onUploadError={(error) => {
            alert(`❌ Upload failed: ${error.message}`);
          }}
          config={{ mode: "auto", maxFileCount: 15 }}
        />

        {files.length > 0 && (
          <div className="mt-6">
            <h2 className="font-semibold mb-2">Uploaded Files:</h2>
            <ul className="list-disc list-inside text-sm text-gray-700">
              {files.map((file, idx) => (
                <li key={idx}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}
