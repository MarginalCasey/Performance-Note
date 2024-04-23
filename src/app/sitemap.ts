import {
  CORE_WEB_VITALS,
  PERFORMANCE_OPTIMIZATION,
  getPaths,
} from "@/app/path";
import { MetadataRoute } from "next";

const domain = "https://performance-note.casey.engineer";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: domain,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    ...getPaths(CORE_WEB_VITALS).map<MetadataRoute.Sitemap[0]>((path) => ({
      url: `${domain}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: path.startsWith("/demo") ? 0.5 : 0.8,
    })),
    ...getPaths(PERFORMANCE_OPTIMIZATION).map<MetadataRoute.Sitemap[0]>(
      (path) => ({
        url: `${domain}${path}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: path.startsWith("/demo") ? 0.5 : 0.8,
      }),
    ),
  ];
}
