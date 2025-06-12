import { createUploadthing, type FileRouter } from "uploadthing/next";

console.log("📦 UPLOADTHING_SECRET:", process.env.UPLOADTHING_SECRET);

const f = createUploadthing();

export const ourFileRouter = {
  fileUploader: f(["pdf", "image", "text", "blob"]).onUploadComplete(
  async ({ file }) => {
    console.log("✅ File uploaded:", file);
  }
),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
