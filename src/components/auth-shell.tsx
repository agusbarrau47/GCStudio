import Link from "next/link";
import { BrandMark } from "./brand-mark";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <main className="grid min-h-svh place-items-center px-5 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Link href="/" aria-label="GC Studio — inicio">
            <BrandMark size="lg" withWordmark={false} />
          </Link>
        </div>
        <div className="surface-elevated p-8">
          <h1 className="font-display text-3xl text-ink">{title}</h1>
          {subtitle && <p className="mt-2 text-sm text-ink/60">{subtitle}</p>}
          <div className="mt-6">{children}</div>
        </div>
        {footer && <div className="mt-6 text-center text-sm text-ink/60">{footer}</div>}
      </div>
    </main>
  );
}
