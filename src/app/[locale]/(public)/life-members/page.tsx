import { getTranslations, setRequestLocale, getLocale } from "next-intl/server";
import { prisma } from "@/lib/db";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";

export default async function LifeMembersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("nav");
  const currentLocale = await getLocale();

  const members = await prisma.lifeMember.findMany({
    orderBy: { displayOrder: "asc" },
  });

  return (
    <Container className="py-20 md:py-28">
      <SectionHeading title={t("lifeMembers")} align="center" className="mx-auto" />
      <div className="mt-14 overflow-hidden rounded-2xl hairline-gold">
        <table className="w-full text-left text-sm">
          <thead className="bg-forest-100 text-forest-800 dark:bg-forest-800 dark:text-cream">
            <tr>
              <th className="px-5 py-3 font-semibold">#</th>
              <th className="px-5 py-3 font-semibold">Name</th>
              <th className="px-5 py-3 font-semibold">Member since</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gold-500/15">
            {members.map((m, i) => (
              <tr key={m.id} className="odd:bg-cream-soft/60 dark:odd:bg-forest-800/30">
                <td className="px-5 py-3 text-ink/50 dark:text-cream/50">{i + 1}</td>
                <td className="px-5 py-3 font-medium text-forest-800 dark:text-cream">
                  {currentLocale === "bn" ? m.nameBn : m.name}
                </td>
                <td className="px-5 py-3 text-gold-600 dark:text-gold-400">{m.memberSince}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
}
