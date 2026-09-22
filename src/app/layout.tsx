import type { Metadata, Viewport } from "next";
import { siteConfig } from "@/config/site.config";
import { CartProvider } from "@/lib/context/cart-context";
import { CartDrawer } from "@/components/cart-drawer";
import { WhatsAppFloating } from "@/components/whatsapp-floating";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.appUrl),
  title: {
    default: siteConfig.seo.title,
    template: "%s · GC Studio",
  },
  description: siteConfig.seo.description,
  applicationName: "GC Studio",
  openGraph: {
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    url: siteConfig.appUrl,
    siteName: "GC Studio",
    locale: "es_AR",
    type: "website",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#FAF6F0",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-AR">
      <head>
        {/* Fuentes vía Google Fonts (carga en runtime; build sin dependencia de red). */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Parisienne&family=Playfair+Display:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans">
        <CartProvider>
          {children}
          <CartDrawer />
          <WhatsAppFloating />
        </CartProvider>
      </body>
    </html>
  );
}
