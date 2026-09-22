import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { siteConfig } from "@/config/site.config";

export const metadata: Metadata = { title: "Política de privacidad" };

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="pt-16">
        <div className="shell max-w-3xl py-16">
          <h1 className="font-display text-4xl text-ink">Política de privacidad</h1>
          <div className="mt-8 space-y-4 text-ink/70">
            <p className="rounded-xl border border-gold/40 bg-gold/[0.06] px-4 py-3 text-sm">
              FALTANTE: placeholder. Completá la política real de tratamiento de datos personales
              (ver SETUP.md §Datos comerciales).
            </p>
            <p>
              GC Studio utiliza tus datos para gestionar tu cuenta, tus compras y tu acceso a los
              cursos. Para consultas escribinos a {siteConfig.contact.email}.
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
