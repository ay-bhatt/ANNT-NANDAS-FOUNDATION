import { NextResponse, type NextRequest } from "next/server";
import { negotiate } from "@/lib/agent/negotiate";

export function middleware(request: NextRequest) {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return NextResponse.next();
  }

  const result = negotiate({
    pathname: request.nextUrl.pathname,
    accept: request.headers.get("accept"),
  });

  if (result.kind === "document") {
    const headers = {
      "Content-Type": result.contentType,
      ...result.headers,
    };
    if (request.method === "HEAD") {
      return new NextResponse(null, { status: result.status, headers });
    }
    return new NextResponse(result.body, { status: result.status, headers });
  }

  const response = NextResponse.next();
  for (const [key, value] of Object.entries(result.headers)) {
    response.headers.set(key, value);
  }
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|api/|gallery/videos/|.*\\.(?:png|jpg|jpeg|webp|gif|svg|ico|mp4|webm|woff2)$).*)",
  ],
};
