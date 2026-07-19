import { Mail, MapPin, Phone } from "lucide-react";
import { getTranslations, setRequestLocale, getLocale } from "next-intl/server";
import { prisma } from "@/lib/db";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { ContactForm } from "@/components/contact/contact-form";
import { MapEmbed } from "@/components/contact/map-embed";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("nav");
  const currentLocale = await getLocale();

  const info = await prisma.contactInfo.findUnique({ where: { id: "main" } });

  return (
    <Container className="py-20 md:py-28">
      <SectionHeading title={t("contact")} align="center" className="mx-auto" />

      <div className="mt-14 grid gap-12 lg:grid-cols-2">
        <div>
          <ul className="space-y-5">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 shrink-0 text-gold-500" size={20} />
              <span className="text-sm text-ink/80 dark:text-cream/80">
                {info ? (currentLocale === "bn" ? info.addressBn : info.address) : "—"}
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="shrink-0 text-gold-500" size={20} />
              <span className="text-sm text-ink/80 dark:text-cream/80">{info?.phone}</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="shrink-0 text-gold-500" size={20} />
              <span className="text-sm text-ink/80 dark:text-cream/80">{info?.email}</span>
            </li>
          </ul>
          <div className="mt-8">
            <MapEmbed src={info?.mapEmbedUrl} />
          </div>
        </div>

        <div>
          <ContactForm />
        </div>
      </div>
    </Container>
  );
}
