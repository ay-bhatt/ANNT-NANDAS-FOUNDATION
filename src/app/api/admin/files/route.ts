import { NextResponse } from "next/server";
import fs from "fs/promises";
import { isAdminRequest } from "@/lib/registration/admin-auth";
import { resolveUploadFile } from "@/lib/registration/store";

export const runtime = "nodejs";

export async function GET(request: Request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ success: false, message: "Sign in required." }, { status: 401 });
  }

  const relativePath = new URL(request.url).searchParams.get("path") || "";
  const resolved = await resolveUploadFile(relativePath);
  if (!resolved) {
    return NextResponse.json({ success: false, message: "File not found." }, { status: 404 });
  }

  const buffer = await fs.readFile(resolved.absolutePath);
  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": resolved.mime,
      "Cache-Control": "private, max-age=300",
      "Content-Disposition": `inline; filename="${relativePath.split("/").pop() || "file"}"`,
    },
  });
}
