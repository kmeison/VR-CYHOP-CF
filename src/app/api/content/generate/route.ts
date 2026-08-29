import { NextResponse } from "next/server";
import { z } from "zod";
import { getDefaultModel, getOpenAIClient } from "@/lib/openai";

const ContentRequest = z.object({
  objective: z.string().min(5),
  subject: z.string().min(2),
  channel: z.enum(["meta", "google", "email", "sms", "landing"]),
});

export async function POST(request: Request) {
  const payload = await request.json();
  const parsed = ContentRequest.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      {
        message: "OPENAI_API_KEY not configured. Returning deterministic placeholder.",
        data: {
          headline: `${parsed.data.subject}: campaign draft`,
          body: `Create ${parsed.data.channel} content for objective: ${parsed.data.objective}`,
        },
      },
      { status: 200 },
    );
  }

  const client = getOpenAIClient();
  const result = await client.responses.create({
    model: getDefaultModel(),
    input: `You are a brand and investor-communications assistant. Draft a concise ${parsed.data.channel} campaign for ${parsed.data.subject}. Objective: ${parsed.data.objective}.`,
  });

  const text = result.output_text || "No content returned.";
  return NextResponse.json({ data: { text } }, { status: 200 });
}
