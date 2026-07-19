import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { format } from "date-fns";
import { Link } from "@/i18n/routing";
import { Card } from "@/components/ui/card";

export interface NewsCardData {
  slug: string;
  title: string;
  titleBn: string;
  excerpt: string;
  excerptBn: string;
  coverImage?: string | null;
  publishedAt?: Date | string | null;
}

export function NewsCard({ item }: { item: NewsCardData }) {
  const locale = useLocale();
  const t = useTranslations("common");

  return (
    <Link href={`/news/${item.slug}`}>
      <Card className="h-full overflow-hidden !p-0">
        <div className="relative aspect-[16/10] w-full">
          <Image
            src={item.coverImage || "/images/news/placeholder.jpg"}
            alt={locale === "bn" ? item.titleBn : item.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-5">
          {item.publishedAt ? (
            <p className="text-xs uppercase tracking-wide text-gold-600 dark:text-gold-400">
              {format(new Date(item.publishedAt), "d MMM yyyy")}
            </p>
          ) : null}
          <h3 className="mt-2 font-display text-lg text-forest-800 dark:text-cream">
            {locale === "bn" ? item.titleBn : item.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm text-ink/70 dark:text-cream/70">
            {locale === "bn" ? item.excerptBn : item.excerpt}
          </p>
          <span className="mt-3 inline-block text-sm font-semibold text-forest-700 dark:text-gold-300">
            {t("readMore")} →
          </span>
        </div>
      </Card>
    </Link>
  );
}
