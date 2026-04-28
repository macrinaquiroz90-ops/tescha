const fallbackSiteUrl = "https://isc-tescha.mx";

export const siteRuntimeConfig = {
  admissionsUrl:
    process.env.NEXT_PUBLIC_ADMISSIONS_URL ??
    "https://tescha.edomex.gob.mx/",
  preregistroUrl:
    process.env.NEXT_PUBLIC_PREREGISTRO_URL ??
    "https://ofertaeducativaies.edugem.gob.mx/preregistro",
  egresadosUrl:
    process.env.NEXT_PUBLIC_EGRESADOS_URL ??
    "https://tescha.edomex.gob.mx/seguimiento-egresados",
  contactEmail:
    process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "jefatura.sistemas@tesch.edu.mx",
  officialProgramUrl:
    process.env.NEXT_PUBLIC_PROGRAM_URL ??
    "https://tescha.edomex.gob.mx/ing-sistemas-computacionales",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? fallbackSiteUrl,
} as const;
