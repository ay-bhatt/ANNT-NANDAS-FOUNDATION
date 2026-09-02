import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/registration/admin-auth";
import { listRegistrationRecords } from "@/lib/registration/store";

export const runtime = "nodejs";

export async function GET() {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ success: false, message: "Sign in required." }, { status: 401 });
  }

  const records = await listRegistrationRecords();
  return NextResponse.json({ success: true, records });
}
