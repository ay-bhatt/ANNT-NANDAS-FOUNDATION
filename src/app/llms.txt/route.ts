import { NextResponse } from "next/server";
import { documentHeaders, MARKDOWN_CONTENT_TYPE } from "@/lib/agent/headers";
import { renderLlmsTxt } from "@/lib/agent/llms-txt";

export function GET() {
  return new NextResponse(renderLlmsTxt(), {
    status: 200,
    headers: {
      "Content-Type": MARKDOWN_CONTENT_TYPE,
      ...documentHeaders(),
    },
  });
}

export function HEAD() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Content-Type": MARKDOWN_CONTENT_TYPE,
      ...documentHeaders(),
    },
  });
}
