import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/SectionHeading";
import {
  modalidades,
  officialResources,
  studyPlanStages,
  studyPlanSummary,
} from "@/content/site";
import { siteRuntimeConfig } from "@/lib/site-config";
import styles from "../section-page.module.css";

export const metadata: Metadata = {
  title: "Plan de Estudios | ISC TESCHA",
  description:
    "Lectura clara del mapa académico de Ingeniería en Sistemas Computacionales en TESCHA.",
};

export default function StudyPlanPage() {
  return (
    <main className={styles.page}>
      <PageHero
        eyebrow="Plan de estudios"
        title="La ruta académica completa de Ingeniería en Sistemas en TESCHA."
        description="Nueve semestres, 210 créditos y cuatro bloques temáticos que van de los fundamentos matemáticos hasta la especialización y la residencia profesional. Basado en los documentos oficiales del TESCHA y el TecNM."
        accent="Mapa académico organizado para aspirantes y estudiantes"
      />

      <section className={styles.section}>
        <SectionHeading
          eyebrow="Resumen"
          title="Nueve semestres y 210 créditos organizados en cuatro bloques."
          description="La retícula oficial distribuye la carga en nueve periodos con progresión desde fundamentos hasta especialización y residencia profesional."
        />

        <div className={styles.metrics}>
          {studyPlanSummary.map((item) => (
            <article className={styles.metricCard} key={item.label}>
              <span className={styles.metricValue}>{item.value}</span>
              <h3>{item.label}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <SectionHeading
          eyebrow="Modalidades"
          title="Elige la modalidad que más se adapta a tu situación."
          description="ISC TESCHA ofrece dos modalidades de estudio para que puedas cursar la carrera según tus necesidades y disponibilidad."
        />
        <div className={styles.resourceGrid}>
          {modalidades.map((m) => (
            <article className={styles.specialtyCard} key={m.title}>
              <p className={styles.cardLabel}>{m.tag}</p>
              <h3>{m.title}</h3>
              <p>{m.description}</p>
              <ul className={styles.moduleList}>
                {m.details.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <SectionHeading
          eyebrow="Bloques formativos"
          title="Fundamentos, construcción, infraestructura y especialización."
          description="El plan agrupa la progresión académica en cuatro etapas: de las bases matemáticas y de programación, pasando por datos y software, hasta la especialización y la residencia profesional."
        />

        <div className={styles.stageGrid}>
          {studyPlanStages.map((stage) => (
            <article className={styles.stageCard} key={stage.title}>
              <p className={styles.cardLabel}>{stage.phase}</p>
              <h3>{stage.title}</h3>
              <p>{stage.description}</p>
              <ul className={styles.subjectList}>
                {stage.subjects.map((subject) => (
                  <li key={subject}>{subject}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <SectionHeading
          eyebrow="Documentos"
          title="Documentos oficiales del programa disponibles en el portal TESCHA."
          description="Retícula oficial, objetivo de egreso, plan de aspirantes y más documentos institucionales del TecNM para la carrera de ISC."
        />

        <div className={styles.resourceGrid}>
          {officialResources.map((resource) => (
            <a
              className={styles.resourceCard}
              href={resource.href}
              key={resource.href}
              rel="noreferrer"
              target="_blank"
            >
              <p className={styles.cardLabel}>Fuente oficial</p>
              <h3>{resource.title}</h3>
              <p>{resource.description}</p>
            </a>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.banner}>
          <div>
            <p className={styles.cardLabel}>Siguiente paso</p>
            <h2>¿Ya decidiste? Explora el proceso de admisión oficial.</h2>
            <p>
              Revisa las fechas de convocatoria vigentes, los requisitos de
              ingreso y el proceso formal para unirte a ISC TESCHA.
            </p>
          </div>

          <div className={styles.actions}>
            <a className={styles.action} href={siteRuntimeConfig.admissionsUrl}>
              Ir a admisiones
            </a>
            <a
              className={styles.secondaryAction}
              href={siteRuntimeConfig.officialProgramUrl}
            >
              Programa oficial
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
