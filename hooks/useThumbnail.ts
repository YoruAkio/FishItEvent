"use client";

import { useState, useEffect } from "react";

// @note hook to fetch thumbnail URL from local API (cached for 1 hour)
export function useThumbnail(mediaId: number | undefined): string | null {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!mediaId) return;

    const fetchThumbnail = async () => {
      try {
        const response = await fetch(`/api/thumbnail?mediaId=${mediaId}`);
        if (response.ok) {
          const data = await response.json();
          setImageUrl(data.imageUrl);
        }
      } catch {
        // @note silently fail, thumbnail is optional
      }
    };

    fetchThumbnail();
  }, [mediaId]);

  return imageUrl;
}
