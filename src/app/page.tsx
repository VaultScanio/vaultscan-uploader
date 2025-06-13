"use client";

import { useState } from "react";
import { UploadDropzone } from "@uploadthing/react";
import type { OurFileRouter } from "./api/uploadthing/core";
import "../styles/globals.css";

export default function Home() {
  const [files, setFiles] = useState<any[]>([]);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
      <div className="max-w-lg w-full bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Upload Your Files</h1>
        <p className="text-gray-600 text-sm text-center mb-6">
          Drop up to 15 documents for VaultScan to analyze duplicates, PII, and more.
        </p>

        <UploadDropzone<OurFileRouter, "fileUploader">
  endpoint="fileUploader"
  onClientUploadComplete={async (res) => {
  console.log("✅ Upload complete hook triggered");
  if (!res || res.length === 0) return;
  setFiles(res);

  const fileUrl = res[0].url;
  const fileName = res[0].name;

  const fileTextContent = await fetch(fileUrl).then((r) => r.text());

  const response = await fetch("/api/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fileName, fileTextContent }),
  });

  const data = await response.json();
  setAnalysisResult(data.result || "No analysis returned.");
}}
  onUploadError={(error) => {
    alert(`❌ Upload failed: ${error.message}`);
  }}
  appearance={{
    button: "ut-ready:bg-violet-500 ut-uploading:cursor-not-allowed rounded-full bg-black text-white px-4 py-2",
    container: "text-black",
  }}
  className="w-full ut-uploading:opacity-50"
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

{analysisResult && (
  <div className="mt-6 p-4 border border-gray-300 rounded bg-white shadow">
    <h2 className="font-semibold text-lg mb-2">AI Analysis:</h2>
    <p>{analysisResult}</p>
  </div>
)}

</main> //Howdy Partner
