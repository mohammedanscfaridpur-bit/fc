import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

const staticPaths = [
  "",
  "history",
  "activities",
  "achievements",
  "management",
  "executive-committee",
  "former-presidents",
  "former-secretaries",
  "life-members",
  "gallery",
  "events",
  "news",
  "membership",
  "sponsors",
  "contact",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://mohammedan-sc-faridpur.com";
  const locales = ["en", "bn"];

  const staticEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    staticPaths.map((p) => ({
      url: `${base}/${locale}${p ? `/${p}` : ""}`,
      lastModified: new Date(),
    })),
  );

  let posts: { slug: string; updatedAt: Date }[] = [];
  try {
    posts = await prisma.newsPost.findMany({
      where: { isPublished: true },
      select: { slug: true, updatedAt: true },
    });
  } catch {
    // DB temporarily unreachable — return the sitemap without news entries
    // rather than failing the whole route
  }

  const newsEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    posts.map((post) => ({
      url: `${base}/${locale}/news/${post.slug}`,
      lastModified: post.updatedAt,
    })),
  );

  return [...staticEntries, ...newsEntries];
}
