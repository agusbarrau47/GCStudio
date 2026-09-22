import Link from "next/link";
import { BrandMark } from "./brand-mark";
import { siteConfig } from "@/config/site.config";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-ink/10 bg-cream">
      <div className="shell grid gap-10 py-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <BrandMark />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink/60">
            {siteConfig.brand.shortDescription}
          </p>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-ink/40">
            {siteConfig.brand.address}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 md:col-span-7 md:grid-cols-3">
          <FooterCol
            title="Formación"
            links={[
              { label: "Laminado de Cejas", href: "/cursos/laminado-de-cejas" },
              { label: "Lifting de Pestañas", href: "/cursos/lifting-de-pestanas" },
              { label: "Bundle Full", href: "/cursos/bundle-full" },
            ]}
          />
          <FooterCol
            title="Campus"
            links={[
              { label: "Ingresar", href: "/login" },
              { label: "Crear cuenta", href: "/registro" },
              { label: "Mi progreso", href: "/dashboard" },
            ]}
          />
          <FooterCol
            title="Contacto & Salón"
            links={[
              { label: `WhatsApp: ${siteConfig.contact.whatsapp}`, href: siteConfig.contact.whatsappUrl },
              { label: `Google Maps (${siteConfig.contact.googleRating} ★)`, href: siteConfig.contact.googleMapsUrl },
              { label: "Dejar opinión en Google ★", href: siteConfig.contact.googleReviewUrl },
              { label: "Instagram @gc.studioba", href: siteConfig.contact.instagramUrl },
              { label: siteConfig.contact.email, href: `mailto:${siteConfig.contact.email}` },
            ]}
          />
        </div>
      </div>

      <div className="border-t border-ink/10">
        <div className="shell flex flex-col gap-2 py-6 text-ink/40 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em]">
            © {year} GC Studio · {siteConfig.brand.founder} · Arenales 1999, Recoleta
          </p>
          <div className="flex gap-5">
            <Link href="/terminos" className="font-mono text-[11px] uppercase tracking-[0.2em] hover:text-gold-dark">
              Términos
            </Link>
            <Link href="/privacidad" className="font-mono text-[11px] uppercase tracking-[0.2em] hover:text-gold-dark">
              Privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="font-mono text-[11px] uppercase tracking-[0.24em] text-gold-dark/70">
        {title}
      </h3>
      <ul className="mt-4 space-y-3">
        {links.map((l) => {
          const isExternal = l.href.startsWith("http") || l.href.startsWith("mailto");
          return (
            <li key={l.label}>
              {isExternal ? (
                <a
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-ink/60 transition-colors hover:text-ink"
                >
                  {l.label}
                </a>
              ) : (
                <Link href={l.href} className="text-sm text-ink/60 transition-colors hover:text-ink">
                  {l.label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
