import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://rkenzotracker.com",
      lastModified: new Date(),
    },
  ];
}