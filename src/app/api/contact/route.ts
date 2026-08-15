import { NextResponse } from "next/server";

type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

export async function POST(request: Request) {
  try {
    const text = await request.text();

    let body: JsonValue | string | undefined;

    // Try JSON first.
    try {
      body = JSON.parse(text) as JsonValue;
    } catch {
      const trimmed = text.trim();

      // Try JSON wrapped in single quotes.
      if (trimmed.startsWith("'") && trimmed.endsWith("'")) {
        try {
          body = JSON.parse(
            trimmed.slice(1, -1).replaceAll("'", '"')
          ) as JsonValue;
        } catch {
          // Continue to URL-encoded parsing.
        }
      }

      // Try URL-encoded form data.
      if (body === undefined) {
        try {
          const params = new URLSearchParams(text);

          if ([...params].length > 0) {
            body = Object.fromEntries(params);
          }
        } catch {
          // Continue to raw text.
        }
      }

      // If nothing else worked, keep the raw text.
      if (body === undefined) {
        body = text;
      }
    }

    // Forward the request to the external contact endpoint.
    const res = await fetch(
      "https://anntnandasfoundation.com/contact.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const upstreamText = await res.text();

    // Try to parse upstream JSON.
    let parsed: JsonValue | string = upstreamText;

    try {
      parsed = JSON.parse(upstreamText) as JsonValue;
    } catch {
      // Keep raw text.
    }

    // If upstream is not OK, store the submission locally as a fallback.
    if (!res.ok) {
      try {
        const fs = await import("fs");
        const path = await import("path");

        const outDir = path.resolve(
          process.cwd(),
          "./.contact_fallback"
        );

        if (!fs.existsSync(outDir)) {
          fs.mkdirSync(outDir, { recursive: true });
        }

        const filename = path.join(
          outDir,
          `${Date.now()}.json`
        );

        fs.writeFileSync(
          filename,
          JSON.stringify(
            {
              received: body,
              upstreamStatus: res.status,
              upstreamBody: parsed,
            },
            null,
            2
          )
        );

        console.warn(
          `/api/contact: upstream returned ${res.status}; stored submission to ${filename}`
        );

        return NextResponse.json(
          {
            success: true,
            status: 202,
            note: "stored_locally",
            file: filename,
          },
          { status: 202 }
        );
      } catch (error) {
        console.error(
          "Failed to write fallback file:",
          error
        );
      }
    }

    return NextResponse.json(
      {
        success: res.ok,
        status: res.status,
        data: parsed,
      },
      { status: res.ok ? 200 : 502 }
    );
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : "Proxy error";

    console.error("/api/contact proxy error:", error);

    return NextResponse.json(
      {
        success: false,
        message,
      },
      { status: 500 }
    );
  }
}