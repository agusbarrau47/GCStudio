import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";

export default function NotFound() {
  return (
    <main className="grid min-h-svh place-items-center px-5 text-center">
      <div>
        <div className="flex justify-center">
          <BrandMark size="lg" withWordmark={false} />
        </div>
        <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-gold-dark/70">
          Error 404
        </p>
        <h1 className="mt-3 font-display text-4xl text-ink">Página no encontrada</h1>
        <p className="mt-3 text-ink/60">La página que buscás no existe o se movió.</p>
        <Link href="/" className="btn-primary mt-8">
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
