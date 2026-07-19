import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { MembershipForm } from "@/components/membership/membership-form";

export default async function MembershipPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("nav");

  return (
    <Container className="max-w-2xl py-20 md:py-28">
      <SectionHeading title={t("membership")} align="center" className="mx-auto" />
      <div className="mt-14">
        <MembershipForm />
      </div>
    </Container>
  );
}
