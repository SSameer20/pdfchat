import { GoogleGenAI } from "@google/genai";
import { LLMInput, LLMResponse } from "./types";

const secret = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: secret });

export async function TalkToLLM(
  input: LLMInput
): Promise<LLMResponse | string> {
  try {
    const prompt = `Act as Document Analyzer and Provide a summary of user questions.

    Things to consider before answering:
    1. Donot use any greetings.
    2. Do not use any thanks.
    3. Do not use based on the information provided in the prompt.
    4. Just Provide clear response
    5. You can use I while referring yourself(Model) and to USer use YOU.
    6. Dont use any abbreviations.
    7. Dont use any jargon.
    8. Dont use any backslash n or any other escape sequence.

    Question : ${JSON.stringify(input)}`;
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    if (!response.text) {
      throw new Error("Result is undefined");
    }
    return { result: response.text };
  } catch (error) {
    return `${error}`;
  }
}
