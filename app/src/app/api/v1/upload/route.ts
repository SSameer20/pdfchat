import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import FormData from "form-data";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const pdfFile = formData.get("pdf");

    if (!pdfFile || typeof pdfFile === "string") {
      throw new Error("Invalid or missing PDF file");
    }

    const buffer = Buffer.from(await pdfFile.arrayBuffer());

    const uploadForm = new FormData();
    uploadForm.append("pdf", buffer, {
      filename: "file.pdf",
      contentType: "application/pdf",
    });

    const response = await axios.post(
      "http://127.0.0.1:5000/pdf/extract",
      uploadForm,
      {
        headers: uploadForm.getHeaders(),
      }
    );

    if (response.status !== 200) {
      throw new Error("No response from ML server");
    }

    const data: { extracted_text?: string } = response.data;

    if (!data.extracted_text) {
      throw new Error("No text extracted from the PDF");
    }
    await client.document.create({
      data: {
        Content: data.extracted_text,
        UserId: 1,
      },
    });

    return NextResponse.json({ text: data.extracted_text });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error || "Internal error" });
  }
};
