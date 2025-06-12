import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  fileUploader: f(["text", "image", "application", "pdf"]).onUploadComplete(
    async ({ file }) => {
      console.log("✅ File uploaded:", file);
    }
  ),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
