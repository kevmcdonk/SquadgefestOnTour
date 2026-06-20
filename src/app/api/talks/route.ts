import { NextResponse } from "next/server";
import { Talk } from "@/types";

function getTalksFunctionUrl(): string | null {
  const baseUrl = process.env.AZURE_TALKS_FUNCTION_URL;
  if (!baseUrl) return null;

  const url = new URL(baseUrl);
  const functionKey = process.env.AZURE_TALKS_FUNCTION_KEY;
  if (functionKey) {
    url.searchParams.set("code", functionKey);
  }

  return url.toString();
}

export async function GET() {
  const functionUrl = getTalksFunctionUrl();
  if (!functionUrl) {
    return NextResponse.json([], { status: 200 });
  }

  try {
    const response = await fetch(functionUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json([], { status: response.status });
    }

    const talks = (await response.json()) as Talk[];
    return NextResponse.json(Array.isArray(talks) ? talks : [], { status: 200 });
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request: Request) {
  const functionUrl = getTalksFunctionUrl();
  if (!functionUrl) {
    return NextResponse.json({ ok: false, message: "Azure talks function is not configured." }, { status: 503 });
  }

  const talks = (await request.json()) as Talk[];
  if (!Array.isArray(talks)) {
    return NextResponse.json({ ok: false, message: "Expected an array of talks." }, { status: 400 });
  }

  try {
    const response = await fetch(functionUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(talks),
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json({ ok: false }, { status: response.status });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
