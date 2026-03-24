import type { Metadata } from "next";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { primaryNavigation } from "@/content/site";
import { siteRuntimeConfig } from "@/lib/site-config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://isc-tescha.mx"),
  title: "Ingeniería en Sistemas Computacionales | TESCHA",
  description:
    "Propuesta web moderna para la carrera de Ingeniería en Sistemas Computacionales del TESCHA.",
  openGraph: {
    title: "Ingeniería en Sistemas Computacionales | TESCHA",
    description:
      "Una propuesta rápida, escalable y moderna para presentar la carrera con lenguaje de producto, tecnología y resultados.",
    url: "https://isc-tescha.mx",
    siteName: "ISC TESCHA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ingeniería en Sistemas Computacionales | TESCHA",
    description:
      "Sitio institucional con arquitectura moderna, experiencia responsive y base lista para dev, QA y prod.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body suppressHydrationWarning>
        <Header
          items={[...primaryNavigation]}
        />
        {children}
        <Footer />
      </body>
    </html>
  );
}
