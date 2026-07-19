import { getTranslations, setRequestLocale } from "next-intl/server";
import { prisma } from "@/lib/db";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { SponsorGrid } from "@/components/sponsors/sponsor-grid";

export default async function SponsorsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("nav");

  const sponsors = await prisma.sponsor.findMany({
    where: { isActive: true },
    orderBy: { displayOrder: "asc" },
  });

  return (
    <Container className="py-20 md:py-28">
      <SectionHeading title={t("sponsors")} align="center" className="mx-auto" />
      <div className="mt-14">
        <SponsorGrid sponsors={sponsors} />
      </div>
    </Container>
  );
}
