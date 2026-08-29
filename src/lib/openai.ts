import OpenAI from "openai";

export function getOpenAIClient(): OpenAI {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is missing");
  }

  return new OpenAI({ apiKey });
}

export function getDefaultModel(): string {
  return process.env.OPENAI_MODEL ?? "gpt-4.1-mini";
}
