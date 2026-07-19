import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/hero";
import { HomeSections } from "@/components/home/home-sections";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <HomeSections />
    </>
  );
}
