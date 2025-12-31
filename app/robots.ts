import { MetadataRoute } from "next";

const siteUrl = "https://fish-it-event.yoruakio.xyz";

// @note generates robots.txt for search engine crawlers
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
