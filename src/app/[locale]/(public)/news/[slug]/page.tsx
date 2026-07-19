import Image from "next/image";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { setRequestLocale, getLocale } from "next-intl/server";
import { prisma } from "@/lib/db";
import { Container } from "@/components/shared/container";

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const currentLocale = await getLocale();

  const post = await prisma.newsPost.findUnique({ where: { slug } });
  if (!post || !post.isPublished) notFound();

  return (
    <article>
      {post.coverImage ? (
        <div className="relative aspect-[21/9] w-full">
          <Image src={post.coverImage} alt="" fill className="object-cover" priority />
        </div>
      ) : null}
      <Container className="max-w-3xl py-16">
        {post.publishedAt ? (
          <p className="text-xs uppercase tracking-wide text-gold-600 dark:text-gold-400">
            {format(new Date(post.publishedAt), "d MMMM yyyy")}
          </p>
        ) : null}
        <h1 className="mt-2 font-display text-3xl text-forest-800 dark:text-cream md:text-4xl">
          {currentLocale === "bn" ? post.titleBn : post.title}
        </h1>
        <div className="prose prose-sm mt-8 max-w-none leading-relaxed text-ink/80 dark:text-cream/80">
          {(currentLocale === "bn" ? post.contentBn : post.content)
            .split("\n")
            .map((para, i) => (para.trim() ? <p key={i}>{para}</p> : null))}
        </div>
      </Container>
    </article>
  );
}
