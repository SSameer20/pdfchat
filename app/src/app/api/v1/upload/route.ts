import { NextRequest, NextResponse } from "next/server";
import { inflateSync } from "zlib";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("pdf");

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json({ error: "No PDF uploaded" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Convert to string to find FlateDecode stream
    const content = buffer.toString("binary");

    // Regex to extract raw FlateDecode stream
    const streamMatch = content.match(
      /\/FlateDecode[\s\S]*?stream\r?\n([\s\S]*?)\r?\nendstream/
    );
    if (!streamMatch || streamMatch.length < 2) {
      return NextResponse.json(
        { error: "No FlateDecode stream found" },
        { status: 400 }
      );
    }

    // Extract the raw stream binary (manually from original buffer)
    const streamStart = content.indexOf(streamMatch[1]);
    const streamEnd = streamStart + streamMatch[1].length;
    const compressedData = buffer.subarray(streamStart, streamEnd);

    // Decompress using zlib
    const decompressed = inflateSync(compressedData);
    const decompressedText = decompressed.toString("utf-8");
    console.log(decompressedText);

    return NextResponse.json({
      success: true,
      decompressed: decompressedText,
    });
  } catch (err) {
    console.error("Decompression failed:", err);
    return NextResponse.json(
      { error: "Failed to decompress stream" },
      { status: 500 }
    );
  }
}
