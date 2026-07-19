import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale, getLocale } from "next-intl/server";
import { prisma } from "@/lib/db";
import { Container } from "@/components/shared/container";
import { EmblemDivider } from "@/components/shared/emblem-divider";

export default async function LeaderDetailPage({
  params,
}: {
  params: Promise<{ locale: string; role: string }>;
}) {
  const { locale, role } = await params;
  setRequestLocale(locale);
  const currentLocale = await getLocale();

  const roleKey = role.toUpperCase();
  if (roleKey !== "PRESIDENT" && roleKey !== "SECRETARY") notFound();

  const leader = await prisma.leadership.findFirst({
    where: { role: roleKey as "PRESIDENT" | "SECRETARY", isCurrent: true },
  });

  if (!leader) notFound();

  return (
    <Container className="py-20 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <div className="relative mx-auto h-36 w-36 overflow-hidden rounded-full border-2 border-gold-500/50">
          <Image
            src={leader.photo || "/images/committee/placeholder.jpg"}
            alt={currentLocale === "bn" ? leader.nameBn : leader.name}
            fill
            className="object-cover"
          />
        </div>
        <h1 className="mt-6 font-display text-3xl text-forest-800 dark:text-cream">
          {currentLocale === "bn" ? leader.nameBn : leader.name}
        </h1>
        <p className="mt-1 font-semibold text-gold-600 dark:text-gold-400">
          {leader.role === "PRESIDENT"
            ? currentLocale === "bn"
              ? "সভাপতি"
              : "President"
            : currentLocale === "bn"
              ? "সাধারণ সম্পাদক"
              : "General Secretary"}
        </p>
        <EmblemDivider className="my-8" />
        <div className="prose prose-sm mx-auto text-left leading-relaxed text-ink/80 dark:text-cream/80">
          <p>
            {currentLocale === "bn"
              ? leader.fullBioBn || leader.shortBioBn
              : leader.fullBio || leader.shortBio}
          </p>
        </div>
      </div>
    </Container>
  );
}
