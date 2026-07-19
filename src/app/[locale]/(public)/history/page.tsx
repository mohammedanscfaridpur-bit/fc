import { getTranslations, setRequestLocale } from "next-intl/server";
import { prisma } from "@/lib/db";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { EmblemDivider } from "@/components/shared/emblem-divider";
import { Timeline } from "@/components/history/timeline";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  return { title: t("history") };
}

export default async function HistoryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("nav");

  const milestones = await prisma.historyMilestone.findMany({
    orderBy: [{ year: "asc" }, { displayOrder: "asc" }],
  });

  return (
    <Container className="py-20 md:py-28">
      <SectionHeading
        eyebrow="১৯৩৬ থেকে আজ"
        title={t("history")}
        align="center"
        className="mx-auto"
      />
      <EmblemDivider className="my-12" />
      {milestones.length > 0 ? (
        <Timeline entries={milestones} />
      ) : (
        <p className="text-center text-ink/50 dark:text-cream/50">
          History content will appear here once added in the admin dashboard.
        </p>
      )}
    </Container>
  );
}
