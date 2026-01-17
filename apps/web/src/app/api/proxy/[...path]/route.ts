import { NextResponse } from "next/server";

export const runtime = "nodejs";

async function handler(req: Request, ctx: { params: Promise<{ path: string[] }> }) {
  const { path } = await ctx.params;

  const targetBase = process.env.API_PROXY_URL;
  if (!targetBase) {
    return NextResponse.json({ error: "Missing API_PROXY_URL" }, { status: 500 });
  }

  const url = new URL(req.url);
  const targetUrl = `${targetBase}/${path.join("/")}${url.search}`;

  const headers = new Headers(req.headers);

  // remove host header (important for proxy)
  headers.delete("host");

  const res = await fetch(targetUrl, {
    method: req.method,
    headers,
    body: req.method === "GET" || req.method === "HEAD" ? undefined : await req.text(),
  });

  const contentType = res.headers.get("content-type") || "";

  // Return JSON or raw text
  if (contentType.includes("application/json")) {
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  }

  const text = await res.text();
  return new NextResponse(text, { status: res.status });
}

export async function GET(req: Request, ctx: any) {
  return handler(req, ctx);
}
export async function POST(req: Request, ctx: any) {
  return handler(req, ctx);
}
export async function PUT(req: Request, ctx: any) {
  return handler(req, ctx);
}
export async function PATCH(req: Request, ctx: any) {
  return handler(req, ctx);
}
export async function DELETE(req: Request, ctx: any) {
  return handler(req, ctx);
}
