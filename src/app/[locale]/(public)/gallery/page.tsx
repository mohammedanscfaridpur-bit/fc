import { getTranslations, setRequestLocale } from "next-intl/server";
import { prisma } from "@/lib/db";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { GalleryGrid } from "@/components/gallery/gallery-grid";

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("nav");

  const images = await prisma.galleryImage.findMany({
    orderBy: [{ displayOrder: "asc" }, { uploadedAt: "desc" }],
  });

  return (
    <Container className="py-20 md:py-28">
      <SectionHeading title={t("gallery")} align="center" className="mx-auto" />
      <div className="mt-14">
        <GalleryGrid items={images} />
      </div>
    </Container>
  );
}
