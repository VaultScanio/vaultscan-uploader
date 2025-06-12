import type { FileRouter } from "uploadthing/next";
import { createUploadthing } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  fileUploader: f(["text", "pdf"])
    .onUploadComplete(async ({ file }) => {
      console.log("✅ File uploaded:", file);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
