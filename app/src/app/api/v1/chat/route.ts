import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { TalkToLLM } from "@/utils/LLM";
import { LLMInput, LLMResponse } from "@/utils/types";

const client = new PrismaClient();

export const POST = async (req: NextRequest) => {
  try {
    const { question, docId } = await req.json();
    const document = await client.document.findFirst({
      where: {
        Id: docId,
        UserId: 1,
      },
    });

    if (!document) {
      throw new Error("Document not found");
    }

    const LLMInputData: LLMInput = {
      question: question,
      content: document.Content,
    };

    const LLMResponse: LLMResponse | string = await TalkToLLM(LLMInputData);
    if (typeof LLMResponse === "string") {
      throw new Error("Invalid Response from LLM");
    }
    return NextResponse.json({ question, result: LLMResponse.result });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error || "Internal error" });
  }
};
