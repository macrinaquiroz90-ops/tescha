import type { Metadata } from "next";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { PageTransition } from "@/components/site/PageTransition";
import { ScrollProgressBar } from "@/components/site/ScrollProgressBar";
import { ScrollToTop } from "@/components/site/ScrollToTop";
import { primaryNavigation } from "@/content/site";
import { siteRuntimeConfig } from "@/lib/site-config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://tescha.pages.dev"),
  title: "Ingeniería en Sistemas Computacionales | TESCHA",
  description:
    "Ingeniería en Sistemas Computacionales en el TESCHA — plan oficial TecNM, 9 semestres, especialidades en Industria 4.0 y Comercio Electrónico, Chalco, Estado de México.",
  openGraph: {
    title: "Ingeniería en Sistemas Computacionales | TESCHA",
    description:
      "Forma tu perfil como ingeniero en sistemas en el TESCHA. Plan oficial TecNM, residencia profesional, dos especialidades activas y egresados en el sector TI.",
    url: "https://tescha.pages.dev",
    siteName: "ISC TESCHA",
    type: "website",
    images: [
      {
        url: "/logos/Logo_Ingenieria_Sistemas.png",
        width: 512,
        height: 512,
        alt: "Logo Ingeniería en Sistemas Computacionales TESCHA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ingeniería en Sistemas Computacionales | TESCHA",
    description:
      "Ingeniería en Sistemas Computacionales en el TESCHA. Plan oficial TecNM, 9 semestres, especialidades en Industria 4.0 y Comercio Electrónico.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        {/*
          Script de inicialización de tema — externo para cumplir CSP sin 'unsafe-inline'.
          El atributo `async` NO se usa aquí intencionalmente: debe bloquear el render
          para evitar el flash de tema incorrecto (FOIT para dark/light mode).
        */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="/theme-init.js" />
      </head>
      <body suppressHydrationWarning>
        <ScrollProgressBar />
        <Header
          items={[...primaryNavigation]}
        />
        <PageTransition>{children}</PageTransition>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
