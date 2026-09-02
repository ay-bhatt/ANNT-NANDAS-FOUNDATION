import { NextResponse } from "next/server";
import { documentHeaders, MARKDOWN_CONTENT_TYPE } from "@/lib/agent/headers";
import { renderAgentInstructions } from "@/lib/agent/llms-txt";

export function GET() {
  return new NextResponse(renderAgentInstructions(), {
    status: 200,
    headers: {
      "Content-Type": MARKDOWN_CONTENT_TYPE,
      ...documentHeaders(),
    },
  });
}
