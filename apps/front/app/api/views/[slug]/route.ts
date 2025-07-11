import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server"; // Make sure NextRequest is imported

const redis = Redis.fromEnv();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug } = body;
    if (typeof slug !== "string" || !slug) {
      return NextResponse.json(
        { error: "Invalid or missing 'slug' in request body." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      await redis
        .get<number>(["pageviews", "projects", slug].join(":"))
        .then((number) => {
          return number ?? 0;
        })
    );
  } catch (error) {
    console.error("Error in API route /api/views:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Note: For the main projects page displaying multiple projects,
// an endpoint that accepts an array of slugs via POST body
// and uses redis.mget (as discussed in the previous step's planning)
// is significantly more efficient than calling this single-slug endpoint
// multiple times from the client. This refactoring specifically addresses
// fetching a *single* slug as requested by the user's latest snippet.
