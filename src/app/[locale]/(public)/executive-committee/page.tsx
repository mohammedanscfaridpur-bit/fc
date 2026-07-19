import { getTranslations, setRequestLocale, getLocale } from "next-intl/server";
import { prisma } from "@/lib/db";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { CommitteeGrid } from "@/components/committee/committee-grid";
import { Card, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default async function ExecutiveCommitteePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("nav");
  const currentLocale = await getLocale();

  const members = await prisma.committeeMember.findMany({
    where: { isActive: true },
    orderBy: { displayOrder: "asc" },
  });

  return (
    <Container className="py-20 md:py-28">
      <SectionHeading title={t("executiveCommittee")} align="center" className="mx-auto" />
      <div className="mt-14">
        <CommitteeGrid>
          {members.map((m) => (
            <Card key={m.id} interactive={false} className="flex flex-col items-center text-center">
              <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-gold-500/50">
                <Image
                  src={m.photo || "/images/committee/placeholder.jpg"}
                  alt={currentLocale === "bn" ? m.nameBn : m.name}
                  fill
                  className="object-cover"
                />
              </div>
              <CardTitle className="mt-4 text-base">
                {currentLocale === "bn" ? m.nameBn : m.name}
              </CardTitle>
              <p className="mt-1 text-sm text-gold-600 dark:text-gold-400">
                {currentLocale === "bn" ? m.designationBn : m.designation}
              </p>
            </Card>
          ))}
        </CommitteeGrid>
      </div>
    </Container>
  );
}
