import { getTranslations, setRequestLocale } from "next-intl/server";
import { prisma } from "@/lib/db";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { FormerLeaderList } from "@/components/committee/former-leader-list";

export default async function FormerSecretariesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("nav");

  const leaders = await prisma.formerLeader.findMany({
    where: { role: "SECRETARY" },
    orderBy: { tenureStart: "desc" },
  });

  return (
    <Container className="py-20 md:py-28">
      <SectionHeading title={t("formerSecretaries")} align="center" className="mx-auto" />
      <div className="mt-14">
        <FormerLeaderList leaders={leaders} />
      </div>
    </Container>
  );
}
