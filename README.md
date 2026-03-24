# ISC TESCHA

Propuesta de sitio institucional moderna para `Ingeniería en Sistemas Computacionales`, construida con `Next.js 16`, `React 19` y `TypeScript`.

## Stack

- `Next.js App Router`
- `React 19`
- `TypeScript`
- `CSS Modules`
- `Metadata`, `robots` y `sitemap` listos para SEO base

## Ambientes

- `dev`: desarrollo local con `Turbopack`
- `qa`: compuerta técnica con lint, typecheck y build
- `prod`: build optimizado para despliegue

## Scripts

```bash
npm run dev
npm run lint
npm run typecheck
npm run qa
npm run build
npm run start
```

## Variables

Crea un `.env.local` o define variables en tu plataforma:

```bash
NEXT_PUBLIC_SITE_URL=https://isc-tescha.mx
NEXT_PUBLIC_ADMISSIONS_URL=https://www.tescha.edu.mx/
NEXT_PUBLIC_CONTACT_EMAIL=sistemas@tescha.edu.mx
NEXT_PUBLIC_PROGRAM_URL=https://tescha.edomex.gob.mx/ing-sistemas-computacionales
```

## Estructura

```text
src/
  app/
    contacto/
    especialidades/
    plan-estudios/
  components/site/
  content/
  lib/
```

## Rutas actuales

- `/`
- `/plan-estudios`
- `/especialidades`
- `/contacto`

## Notas

- El contenido institucional está centralizado en `src/content/site.ts`.
- La configuración pública de despliegue vive en `src/lib/site-config.ts`.
- La base está lista para crecer a más rutas, formularios o consumo de APIs.
