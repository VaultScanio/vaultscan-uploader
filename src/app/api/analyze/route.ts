import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { fileName, fileTextContent } = body;

  const prompt = `Analyze this file named "${fileName}". Give insights like duplication risk, sensitive content, or file staleness:\n\n${fileTextContent}`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });

    const result = completion.choices[0]?.message?.content || "No response";
    return NextResponse.json({ result });
  } catch (error: any) {
    console.error("OpenAI error:", error);
    return NextResponse.json({ error: "OpenAI request failed" }, { status: 500 });
  }
}
