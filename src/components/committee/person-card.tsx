import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";

interface PersonCardProps {
  slug: string;
  photo?: string | null;
  name: string;
  nameBn: string;
  designation: string;
  designationBn: string;
  shortBio: string;
  shortBioBn: string;
  readMoreHref?: string;
}

export function PersonCard({
  slug,
  photo,
  name,
  nameBn,
  designation,
  designationBn,
  shortBio,
  shortBioBn,
  readMoreHref,
}: PersonCardProps) {
  const locale = useLocale();
  const t = useTranslations("common");

  return (
    <Card className="flex flex-col items-center text-center">
      <div className="relative h-28 w-28 overflow-hidden rounded-full border-2 border-gold-500/50">
        <Image
          src={photo || "/images/committee/placeholder.jpg"}
          alt={locale === "bn" ? nameBn : name}
          fill
          className="object-cover"
        />
      </div>
      <CardTitle className="mt-4">{locale === "bn" ? nameBn : name}</CardTitle>
      <p className="mt-1 text-sm font-medium text-gold-600 dark:text-gold-400">
        {locale === "bn" ? designationBn : designation}
      </p>
      <CardDescription className="line-clamp-3">
        {locale === "bn" ? shortBioBn : shortBio}
      </CardDescription>
      {readMoreHref ? (
        <Link
          href={readMoreHref}
          className="mt-4 text-sm font-semibold text-forest-700 underline decoration-gold-500 underline-offset-4 dark:text-gold-300"
        >
          {t("readMore")}
        </Link>
      ) : null}
    </Card>
  );
}
