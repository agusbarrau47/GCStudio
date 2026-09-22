import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site.config";
import { COURSES, BUNDLE } from "@/content/courses";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.appUrl;
  const now = new Date();
  const staticRoutes = ["", "/login", "/registro", "/terminos", "/privacidad"].map(
    (p) => ({ url: `${base}${p}`, lastModified: now })
  );
  const courseRoutes = [...COURSES.map((c) => c.slug), BUNDLE.slug].map((slug) => ({
    url: `${base}/cursos/${slug}`,
    lastModified: now,
  }));
  return [...staticRoutes, ...courseRoutes];
}
