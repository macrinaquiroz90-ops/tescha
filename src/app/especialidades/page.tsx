import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/SectionHeading";
import {
  educationalObjectives,
  exitAttributes,
  officialResources,
  specializationShowcase,
} from "@/content/site";
import styles from "../section-page.module.css";

export const metadata: Metadata = {
  title: "Especialidades | ISC TESCHA",
  description:
    "Especialidades y áreas de enfoque visibles en fuentes oficiales del programa ISC TESCHA.",
};

export default function SpecialtiesPage() {
  return (
    <main className={styles.page}>
      <PageHero
        eyebrow="Especialidades"
        title="Elige el área donde quieres construir tu perfil profesional."
        description="Dos especialidades formales más rutas en desarrollo web, móvil y ciencia de datos. Conoce hacia dónde puede orientarse tu carrera desde los últimos semestres del programa."
        accent="Rutas tecnológicas alineadas al mercado laboral actual"
      />

      <section className={styles.section}>
        <SectionHeading
          eyebrow="Panorama"
          title="Cuatro rutas tecnológicas que puedes elegir en ISC TESCHA."
          description="Cada especialidad corresponde a un frente tecnológico activo en la industria: desarrollo de aplicaciones, ciencia de datos, industria 4.0 y comercio electrónico."
        />

        <div className={styles.specialtyGrid}>
          {specializationShowcase.map((specialty) => (
            <article className={styles.specialtyCard} key={specialty.title}>
              <p className={styles.cardLabel}>{specialty.family}</p>
              <h3>{specialty.title}</h3>
              <p>{specialty.description}</p>
              <ul className={styles.moduleList}>
                {specialty.modules.map((module) => (
                  <li key={module}>{module}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <SectionHeading
          eyebrow="Mercado laboral"
          title="Cada especialidad conecta con un sector real del mercado tecnológico."
          description="Entiende hacia dónde puede crecer tu perfil: software, datos, automatización, plataformas de negocio digital y operación industrial."
        />

        <div className={styles.featureGrid}>
          <article className={styles.featureCard}>
            <p className={styles.cardLabel}>Software</p>
            <h3>Desarrollo web, móvil y servicios</h3>
            <p>
              Sirve para posicionar a la carrera en el terreno donde hoy
              compiten más fuerte los perfiles junior y mid-level.
            </p>
          </article>
          <article className={styles.featureCard}>
            <p className={styles.cardLabel}>Datos</p>
            <h3>Analítica y aplicaciones inteligentes</h3>
            <p>
              Hace visible una ruta alineada a automatización, apoyo a
              decisiones y productos basados en información.
            </p>
          </article>
          <article className={styles.featureCard}>
            <p className={styles.cardLabel}>Industria</p>
            <h3>Integración con operación y transformación digital</h3>
            <p>
              Refuerza que ISC no solo vive en software puro; también puede
              conectar sistemas con entornos industriales y de negocio.
            </p>
          </article>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.banner}>
          <div>
            <p className={styles.cardLabel}>Fuentes oficiales</p>
            <h2>La información de las especialidades tiene respaldo institucional.</h2>
            <p>
              Consulta el programa oficial del TESCHA y el plan de estudio para aspirantes directamente en las fuentes del TecNM.
            </p>
          </div>

          <div className={styles.actions}>
            <a
              className={styles.action}
              href={officialResources[0].href}
              rel="noreferrer"
              target="_blank"
            >
              Ver programa oficial
            </a>
            <a
              className={styles.secondaryAction}
              href={officialResources[1].href}
              rel="noreferrer"
              target="_blank"
            >
              Ver plan para aspirantes
            </a>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <SectionHeading
          eyebrow="Objetivos educacionales"
          title="Lo que persigue ISC TESCHA en la formación de sus egresados."
          description="Cuatro objetivos formales del plan TecNM que orientan el perfil de los ingresados al campo profesional y académico."
        />
        <div className={styles.stageGrid}>
          {educationalObjectives.map((obj) => (
            <article className={styles.stageCard} key={obj.num}>
              <p className={styles.cardLabel}>Objetivo {obj.num}</p>
              <p>{obj.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <SectionHeading
          eyebrow="Atributos de egreso"
          title="Siete competencias que el ingeniero desarrolla a lo largo de la carrera."
          description="Atributos oficiales del TecNM para ISC: competencias técnicas específicas que definen las capacidades del perfil de egreso."
        />
        <div className={styles.specialtyGrid}>
          {exitAttributes.map((attr) => (
            <article className={styles.specialtyCard} key={attr.num}>
              <p className={styles.cardLabel}>Atributo {attr.num}</p>
              <p>{attr.text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
