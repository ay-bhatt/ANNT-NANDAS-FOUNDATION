import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Forward the request to the external contact endpoint from the server.
    const res = await fetch("https://anntnandasfoundation.com/contact.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const text = await res.text();

    // Try to parse JSON, otherwise return text.
    let parsed: any = text;
    try {
      parsed = JSON.parse(text);
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
    return NextResponse.json({ success: false, message: err?.message ?? "Proxy error" }, { status: 500 });
  }
}
