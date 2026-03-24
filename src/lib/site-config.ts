const fallbackSiteUrl = "https://isc-tescha.mx";

export const siteRuntimeConfig = {
  admissionsUrl:
    process.env.NEXT_PUBLIC_ADMISSIONS_URL ??
    "https://www.tescha.edu.mx/",
  contactEmail:
    process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "sistemas@tescha.edu.mx",
  officialProgramUrl:
    process.env.NEXT_PUBLIC_PROGRAM_URL ??
    "https://tescha.edomex.gob.mx/ing-sistemas-computacionales",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? fallbackSiteUrl,
} as const;
