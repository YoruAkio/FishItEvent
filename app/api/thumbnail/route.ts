import { NextRequest, NextResponse } from "next/server";

// @note proxy route to fetch thumbnails from Roblox with caching
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const mediaId = searchParams.get("mediaId");

  if (!mediaId) {
    return NextResponse.json({ error: "mediaId is required" }, { status: 400 });
  }

  try {
    const response = await fetch("https://thumbnails.roblox.com/v1/batch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        {
          requestId: `${mediaId}::Asset:768x432:webp:regular`,
          type: "Asset",
          targetId: Number(mediaId),
          format: "webp",
          size: "768x432",
        },
      ]),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch thumbnail" },
        { status: response.status }
      );
    }

    const data = await response.json();
    const imageUrl = data.data?.[0]?.imageUrl;

    if (!imageUrl) {
      return NextResponse.json({ error: "Thumbnail not found" }, { status: 404 });
    }

    // @note cache thumbnail URLs for 1 hour
    return NextResponse.json(
      { imageUrl },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch thumbnail" },
      { status: 500 }
    );
  }
}

// @note cache this route for 1 hour
export const revalidate = 3600;
