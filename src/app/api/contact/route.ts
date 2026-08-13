import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";

    // Read raw text to be tolerant of different client payloads.
    const text = await request.text();

    let body: any = undefined;

    // Try JSON first.
    try {
      body = JSON.parse(text);
    } catch (err) {
      // If the payload was wrapped in single quotes (common when using Windows curl), try stripping them.
      const trimmed = text.trim();
      if (trimmed.startsWith("'") && trimmed.endsWith("'")) {
        try {
          body = JSON.parse(trimmed.slice(1, -1).replaceAll("'", '"'));
        } catch (_) {
          /* fallthrough */
        }
      }

      // Try URL-encoded form data
      if (body === undefined) {
        try {
          const params = new URLSearchParams(text);
          if ([...params].length > 0) body = Object.fromEntries(params);
        } catch (_) {
          /* fallthrough */
        }
      }

      // If still undefined, keep raw text
      if (body === undefined) body = text;
    }

    // Forward the request to the external contact endpoint from the server.
    const res = await fetch("https://anntnandasfoundation.com/contact.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const upstreamText = await res.text();

    // Try to parse upstream JSON
    let parsed: any = upstreamText;
    try {
      parsed = JSON.parse(upstreamText);
    } catch (e) {
      // keep raw text
    }

    return NextResponse.json(
      {
        success: res.ok,
        status: res.status,
        data: parsed,
      },
      { status: res.ok ? 200 : 502 }
    );
  } catch (err: any) {
    console.error("/api/contact proxy error:", err);
    return NextResponse.json({ success: false, message: err?.message ?? "Proxy error" }, { status: 500 });
  }
}
