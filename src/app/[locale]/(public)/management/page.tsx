import { getTranslations, setRequestLocale } from "next-intl/server";
import { prisma } from "@/lib/db";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { PersonCard } from "@/components/committee/person-card";

export default async function ManagementPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("nav");

  const leaders = await prisma.leadership.findMany({
    where: { isCurrent: true },
    orderBy: { role: "asc" },
  });

  return (
    <Container className="py-20 md:py-28">
      <SectionHeading title={t("management")} align="center" className="mx-auto" />
      <div className="mx-auto mt-14 grid max-w-2xl grid-cols-1 gap-8 sm:grid-cols-2">
        {leaders.map((leader) => (
          <PersonCard
            key={leader.id}
            slug={leader.id}
            photo={leader.photo}
            name={leader.name}
            nameBn={leader.nameBn}
            designation={leader.role}
            designationBn={leader.role === "PRESIDENT" ? "সভাপতি" : "সাধারণ সম্পাদক"}
            shortBio={leader.shortBio}
            shortBioBn={leader.shortBioBn}
            readMoreHref={`/management/${leader.role.toLowerCase()}`}
          />
        ))}
      </div>
    </Container>
  );
}
