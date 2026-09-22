import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { siteConfig } from "@/config/site.config";

export const metadata: Metadata = { title: "Términos y condiciones" };

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main className="pt-16">
        <div className="shell max-w-3xl py-16">
          <p className="eyebrow">Marco legal & condiciones comerciales</p>
          <h1 className="mt-2 font-display text-4xl text-ink">Términos y condiciones de contratación</h1>
          <p className="mt-3 text-xs font-mono uppercase tracking-[0.14em] text-ink/50">
            Última actualización: Septiembre 2026 · GC Studio ({siteConfig.brand.legalName})
          </p>

          <div className="mt-10 space-y-8 text-sm leading-relaxed text-ink/75">
            {/* Cláusula destacada de respaldo */}
            <div className="rounded-2xl border border-gold/30 bg-gradient-to-br from-white via-cream-50 to-cream-100/50 p-6 shadow-sm">
              <div className="flex items-center gap-2 text-gold-dark font-bold font-mono text-xs uppercase tracking-[0.16em]">
                <span>🛡️</span>
                <span>Cláusula Especial de Seguridad: Respaldo y Descarga de Material</span>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-ink/80">
                <strong>Garantía de preservación permanente para la alumna:</strong> Al adquirir cualquier curso o formación
                (modalidad online o presencial), la alumna adquiere el derecho pleno e irrestricto de <strong>descargar la totalidad
                de los materiales didácticos complementarios</strong> (manuales técnicos oficiales en PDF, fichas de visagismo,
                protocolos paso a paso de bioseguridad ANMAT, checklists de insumos y modelos de consentimiento informado).
              </p>
              <p className="mt-2 text-xs leading-relaxed text-ink/80">
                Esta disposición garantiza legalmente a la alumna la posibilidad de generar un <strong>respaldo local (copia de seguridad offline)</strong>
                en sus propios dispositivos o unidades de almacenamiento personal. De este modo, la alumna tiene la certeza absoluta de
                que su inversión y su material formativo quedan en su poder de forma perpetua e inalterable, resguardada ante eventuales
                contingencias técnicas, mantenimientos, caídas de servidores o cualquier hipotética discontinuidad comercial o cese de la plataforma web.
              </p>
            </div>

            <section className="space-y-3">
              <h2 className="font-display text-xl text-ink font-semibold">1. Objeto y Modalidades de Formación</h2>
              <p>
                Los presentes términos regulan la contratación de servicios de formación profesional brindados por GC Studio, comprendiendo tanto
                la <strong>Modalidad Online</strong> (acceso al campus privado digital) como la <strong>Modalidad Presencial VIP</strong> (práctica intensiva 1 a 1 en el estudio de Recoleta, CABA).
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-xl text-ink font-semibold">2. Acceso al Campus Digital</h2>
              <p>
                El acceso al campus online es personal e intransferible. Una vez procesado el pago a través de los medios habilitados (Mercado Pago,
                transferencia bancaria o tarjeta), se habilitan de forma inmediata los módulos contratados, con reproducción ilimitada de video y
                descarga directa de dossiers y guías.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-xl text-ink font-semibold">3. Formaciones Presenciales (Studio Recoleta)</h2>
              <p>
                Las masterclasses presenciales se coordinan con reserva previa de fecha sujeta a disponibilidad de cabina y modelo viva. La seña
                de reserva congela la vacante y habilita automáticamente el acceso anticipado al material teórico en el campus para su estudio previo.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-xl text-ink font-semibold">4. Propiedad Intelectual y Uso del Material</h2>
              <p>
                Los contenidos, metodologías de visagismo y esquemas pedagógicos desarrollados por Geraldine Colman están protegidos por leyes de
                propiedad intelectual. La descarga del material tiene fines estrictamente formativos y de respaldo personal; queda prohibida su
                reventa, redistribución masiva o comercialización por parte de terceros.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-xl text-ink font-semibold">5. Soporte y Canales de Contacto</h2>
              <p>
                Para consultas académicas, dudas sobre el uso de los productos o coordinación de turnos presenciales:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs text-ink/70">
                <li>Email institucional: {siteConfig.contact.email}</li>
                <li>WhatsApp directo de atención a alumnas: {siteConfig.contact.whatsapp}</li>
                <li>Estudio presencial: Arenales 1999, Recoleta, Ciudad Autónoma de Buenos Aires.</li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
