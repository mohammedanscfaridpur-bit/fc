import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Facebook, Youtube, Instagram, MapPin, Phone, Mail } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/shared/container";
import { EmblemDivider } from "@/components/shared/emblem-divider";
import { footerNav } from "@/lib/nav";

export function SiteFooter() {
  const t = useTranslations();
  const locale = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-forest-900 text-cream/80">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo/logo.png"
                alt={t("site.name")}
                width={48}
                height={48}
                className="h-12 w-12"
              />
              <div>
                <p className="font-display text-lg text-cream">{t("site.name")}</p>
                <p className="text-xs tracking-wide text-gold-400">
                  {t("site.location")} · {t("site.founded")}
                </p>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/60">
              {t("site.tagline")}
            </p>
            <div className="mt-6 flex gap-3">
              {[Facebook, Youtube, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="social link"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-gold-500/30 transition-colors hover:bg-gold-500 hover:text-forest-900"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="eyebrow mb-4 text-gold-400">{t("footer.quickLinks")}</p>
            <ul className="space-y-2 text-sm">
              {footerNav.map((item) => (
                <li key={item.href}>
                  {item.isAnchor ? (
                    <a
                      href={`/${locale}${item.href.startsWith("/") ? item.href.slice(1) : item.href}`}
                      className="hover:text-gold-300"
                    >
                      {t(`nav.${item.labelKey}`)}
                    </a>
                  ) : (
                    <Link href={item.href} className="hover:text-gold-300">
                      {t(`nav.${item.labelKey}`)}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-4 text-gold-400">{t("footer.address")}</p>
            <ul className="space-y-3 text-sm text-cream/70">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0 text-gold-400" />
                <span>Mohammedan Sporting Club, Faridpur, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-gold-400" />
                <span>+880 XXX-XXXXXX</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-gold-400" />
                <span>info@mohammedan-sc-faridpur.com</span>
              </li>
            </ul>
          </div>
        </div>

        <EmblemDivider className="my-10" />

        <p className="text-center text-xs text-cream/50">
          © {year} {t("site.name")}, {t("site.location")} — {t("footer.rightsReserved")}
        </p>
      </Container>
    </footer>
  );
}
