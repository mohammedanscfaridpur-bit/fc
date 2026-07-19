import Image from "next/image";
import { getTranslations, setRequestLocale, getLocale } from "next-intl/server";
import { prisma } from "@/lib/db";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function AchievementsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("nav");
  const currentLocale = await getLocale();

  const achievements = await prisma.achievement.findMany({
    orderBy: [{ year: "desc" }, { displayOrder: "asc" }],
  });

  return (
    <Container className="py-20 md:py-28">
      <SectionHeading title={t("achievements")} align="center" className="mx-auto" />
      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map((a) => (
          <Card key={a.id} interactive={false}>
            {a.image ? (
              <div className="relative mb-4 aspect-video overflow-hidden rounded-lg">
                <Image src={a.image} alt="" fill className="object-cover" />
              </div>
            ) : null}
            <Badge>{a.year}</Badge>
            <CardTitle className="mt-3">
              {currentLocale === "bn" ? a.titleBn : a.title}
            </CardTitle>
            {a.description ? (
              <CardDescription>
                {currentLocale === "bn" ? a.descriptionBn : a.description}
              </CardDescription>
            ) : null}
          </Card>
        ))}
      </div>
    </Container>
  );
}
