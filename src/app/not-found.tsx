import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Página no encontrada | ISC TESCHA",
  description: "La página que buscas no existe.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "2rem",
        gap: "1.5rem",
      }}
    >
      <p
        style={{
          fontSize: "5rem",
          fontWeight: 800,
          lineHeight: 1,
          background: "linear-gradient(135deg, #ffffff 0%, #2ff4d8 55%, #7c6bff 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        404
      </p>
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
          fontWeight: 800,
          letterSpacing: "-0.03em",
          maxWidth: "520px",
          lineHeight: 1.15,
        }}
      >
        Esta página no existe.
      </h1>
      <p
        style={{
          color: "var(--muted)",
          lineHeight: 1.75,
          maxWidth: "440px",
          fontSize: "1rem",
        }}
      >
        La ruta que visitaste no está disponible. Usa el menú de navegación o regresa al inicio para continuar explorando ISC TESCHA.
      </p>
      <Link
        href="/"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.9rem 1.6rem",
          borderRadius: "999px",
          background: "linear-gradient(135deg, var(--accent), #5fffdf)",
          color: "#031a16",
          fontWeight: 800,
          fontSize: "0.95rem",
          textDecoration: "none",
          boxShadow: "0 0 28px rgba(47, 244, 216, 0.28)",
          transition: "transform 200ms ease, box-shadow 200ms ease",
        }}
      >
        ← Ir al inicio
      </Link>
    </main>
  );
}
