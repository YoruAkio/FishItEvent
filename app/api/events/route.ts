import { NextResponse } from "next/server";

const ROBLOX_EVENTS_API =
  "https://apis.roblox.com/virtual-events/v1/universes/6701277882/virtual-events";

// @note proxy route to fetch events from Roblox API with caching
export async function GET() {
  try {
    const response = await fetch(ROBLOX_EVENTS_API, {
      headers: {
        "User-Agent": "FishItEvent/1.0",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Roblox API error: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    // @note set cache headers for client-side caching (5 min cache, 10 min stale)
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}

// @note cache this route for 5 minutes
export const revalidate = 300;
