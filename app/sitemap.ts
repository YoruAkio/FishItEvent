import { MetadataRoute } from "next";

const siteUrl = "https://fish-it-event.yoruakio.xyz";

// @note generates sitemap.xml for SEO
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 1,
    },
    {
      url: `${siteUrl}/why`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
