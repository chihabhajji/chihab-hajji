import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";
import { ipAddress } from "@vercel/edge";

const redis = Redis.fromEnv();
export const runtime = "edge"; // Use 'runtime' instead of 'config' for edge functions in App Router

export async function POST(req: NextRequest): Promise<NextResponse> {
  const slug = req.nextUrl.searchParams.get("slug");

  if (!slug) {
    return new NextResponse("Slug not found", { status: 400 });
  }
  const ip = ipAddress(req);
  console.log(ip);
  if (ip) {
    // Hash the IP in order to not store it directly in your db.
    const buf = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(ip)
    );
    const hash = Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    // deduplicate the ip for each slug
    const isNew = await redis.set(["deduplicate", hash, slug].join(":"), true, {
      nx: true,
      ex: 24 * 60 * 60,
    });
    if (!isNew) {
      return new NextResponse(null, { status: 202 });
    }
  }
  await redis.incr(["pageviews", "projects", slug].join(":"));
  return new NextResponse(null, { status: 202 });
}
