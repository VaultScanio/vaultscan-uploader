import { NextResponse } from "next/server";
import OpenAI from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { fileName, fileTextContent } = await req.json();

    console.log("📂 Received file:", fileName);
    console.log("📄 Text snippet:", fileTextContent.slice(0, 200));

    const prompt = `
Analyze the content below and summarize it with these requirements:
- Do NOT include phrases like "Thank you", "Let me know if you have questions", or "Please contact us".
- Do NOT use customer support language or pleasantries.
- Your summary should be direct, clear, and strictly professional.

Document name: ${fileName}
---
${fileTextContent.slice(0, 5000)}
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You're a professional document analyst." },
        { role: "user", content: prompt },
      ],
    });

    console.log("🧠 OpenAI raw response:", completion);

    const result = completion.choices[0]?.message?.content;
    return NextResponse.json({ result });
  } catch (error: any) {
    console.error("❌ Error in /api/analyze:", error?.message || error);
    return NextResponse.json(
      { error: "Something went wrong during analysis." },
      { status: 500 }
    );
  }
}
