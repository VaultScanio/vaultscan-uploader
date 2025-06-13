// src/app/api/analyze/route.ts
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { fileName, fileTextContent } = await req.json();

  const prompt = `
You are an assistant that analyzes uploaded internal documents.

Document name: ${fileName}
---
${fileTextContent.slice(0, 5000)} // limit for safety
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: "You're a professional document analyst." },
      { role: "user", content: prompt },
    ],
  });

  const result = completion.choices[0].message.content;
  return NextResponse.json({ result });
}
