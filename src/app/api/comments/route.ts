import { NextResponse } from "next/server";
import { addComment, getComments, isValidRating } from "@/lib/comments-store";
import { checkCommentRateLimit } from "@/lib/comments-rate-limit";
import { getClientIp } from "@/lib/mou-rate-limit";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ success: true, comments: getComments() });
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (!checkCommentRateLimit(ip)) {
    return NextResponse.json(
      { success: false, message: "Too many comments. Please try again later." },
      { status: 429 },
    );
  }

  let body: { name?: unknown; content?: unknown; rating?: unknown };
  try {
    body = (await request.json()) as { name?: unknown; content?: unknown; rating?: unknown };
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name : "";
  const content = typeof body.content === "string" ? body.content : "";
  const rating = typeof body.rating === "number" ? body.rating : Number(body.rating);

  if (!isValidRating(rating)) {
    return NextResponse.json(
      { success: false, message: "Please choose a rating between 1 and 5 stars." },
      { status: 400 },
    );
  }

  const result = addComment({ name, content, rating });
  if (result.error || !result.comment) {
    return NextResponse.json({ success: false, message: result.error || "Unable to save comment." }, { status: 400 });
  }

  return NextResponse.json({ success: true, comment: result.comment }, { status: 201 });
}
