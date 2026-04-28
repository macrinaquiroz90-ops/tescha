import type { NextConfig } from "next";

// ─── Dominios externos usados en el sitio ────────────────────────────────────
const GOOGLE_MAPS_HOST = "https://maps.google.com";
const FONTS_STYLE = "https://fonts.googleapis.com";
const FONTS_ASSETS = "https://fonts.gstatic.com";

// ─── Content Security Policy ─────────────────────────────────────────────────
// Nota: style-src necesita 'unsafe-inline' mientras Next.js App Router
// inyecte estilos en tiempo de hidratación. Eliminar cuando se implemente nonce.
const cspDirectives = [
  "default-src 'self'",
  "script-src 'self'",
  `style-src 'self' 'unsafe-inline' ${FONTS_STYLE}`,
  `img-src 'self' data: https:`,
  `font-src 'self' ${FONTS_ASSETS}`,
  `frame-src ${GOOGLE_MAPS_HOST}`,
  `connect-src 'self'`,
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self' https://formspree.io",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  // Content Security Policy
  { key: "Content-Security-Policy", value: cspDirectives },
  // Anti-Clickjacking (respaldo para navegadores legacy que no entienden CSP frame-ancestors)
  { key: "X-Frame-Options", value: "DENY" },
  // Previene MIME-type sniffing
  { key: "X-Content-Type-Options", value: "nosniff" },
  // HSTS — 2 años, incluye subdominios, en lista preload
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Controla cuánta info de referrer se comparte
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Restringe acceso a APIs del navegador que este sitio no necesita
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  // Protección XSS para navegadores legacy (IE, Chrome antiguo)
  { key: "X-XSS-Protection", value: "1; mode=block" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Deshabilita source maps en producción — no exponer lógica interna
  productionBrowserSourceMaps: false,
  output: "export",
  images: {
    unoptimized: true,
  },
  // Los headers solo aplican en modo servidor (next start / next dev).
  // Para el export estático, los headers se definen en public/_headers (Cloudflare).
  // Se mantienen aquí para entornos de preview con `next start`.
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
