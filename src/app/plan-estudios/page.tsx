import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/SectionHeading";
import { TrustNote } from "@/components/site/TrustNote";
import { AnimatedGrid, AnimatedCard, AnimatedSection, CountUp } from "@/components/site/AnimatedSection";
import {
  graduateProfile,
  laborField,
  modalidades,
  officialResources,
  roadmapPhases,
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
      >
        <TrustNote compact />
      </PageHero>

      <section className={styles.section}>
        <SectionHeading
          eyebrow="Resumen"
          title="Nueve semestres y 210 créditos organizados en cuatro bloques."
          description="La retícula oficial distribuye la carga en nueve periodos con progresión desde fundamentos hasta especialización y residencia profesional."
        />

        <div className={styles.metrics}>
          {studyPlanSummary.map((item) => (
            <article className={styles.metricCard} key={item.label}>
              <CountUp value={item.value} className={styles.metricValue} />
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
            <AnimatedCard key={m.title}>
              <article className={styles.specialtyCard}>
                <p className={styles.cardLabel}>{m.tag}</p>
                <h3>{m.title}</h3>
                <p>{m.description}</p>
                <ul className={styles.moduleList}>
                  {m.details.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </article>
            </AnimatedCard>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <SectionHeading
          eyebrow="Bloques formativos"
          title="Fundamentos, construcción, infraestructura y especialización."
          description="El plan agrupa la progresión académica en cuatro etapas: de las bases matemáticas y de programación, pasando por datos y software, hasta la especialización y la residencia profesional."
        />

        <AnimatedGrid className={styles.stageGrid}>
          {studyPlanStages.map((stage) => (
            <AnimatedCard key={stage.title}>
              <article className={styles.stageCard}>
                <p className={styles.cardLabel}>{stage.phase}</p>
                <h3>{stage.title}</h3>
                <p>{stage.description}</p>
                <ul className={styles.subjectList}>
                  {stage.subjects.map((subject) => (
                    <li key={subject}>{subject}</li>
                  ))}
                </ul>
              </article>
            </AnimatedCard>
          ))}
        </AnimatedGrid>
      </section>

      <section className={styles.section}>
        <SectionHeading
          eyebrow="Trayectoria académica"
          title="De los fundamentos al despliegue profesional en cuatro fases."
          description="La carrera avanza de lógica y algoritmos hasta especialización, residencia profesional y entrega de proyecto. Cada fase tiene propósito claro."
        />
        <div className={styles.timeline}>
          {roadmapPhases.map((phase, i) => (
            <AnimatedSection key={phase.phase} delay={i * 0.08}>
              <div className={styles.timelineItem}>
                <div className={styles.timelineDot} />
                <article className={styles.timelineCard}>
                  <p className={styles.cardLabel}>{phase.phase}</p>
                  <h3>{phase.title}</h3>
                  <p>{phase.description}</p>
                  <div className={styles.tagList}>
                    {phase.focus.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </article>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <SectionHeading
          eyebrow="Perfil de egreso"
          title="Lo que sabe hacer un ingeniero que egresa de ISC TESCHA."
          description="Nueve capacidades concretas del plan oficial TecNM: desde desarrollo de software hasta gestión de redes y criterio estratégico para soluciones tecnológicas."
        />
        <AnimatedGrid className={styles.featureGrid}>
          {graduateProfile.map((item) => (
            <AnimatedCard key={item}>
              <article className={styles.featureCard}>
                <p>{item}</p>
              </article>
            </AnimatedCard>
          ))}
        </AnimatedGrid>
      </section>

      <section className={styles.section}>
        <SectionHeading
          eyebrow="Campo laboral"
          title="Dónde trabaja un egresado de ISC TESCHA."
          description="La carrera abre puertas en sectores de software, datos, redes, consultoría y emprendimiento tecnológico a nivel regional y nacional."
        />
        <article className={styles.featureCard}>
          <p>{laborField.description}</p>
          <ul className={styles.moduleList}>
            {laborField.areas.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
          <div className={styles.actions}>
            <a
              className={styles.secondaryAction}
              href={siteRuntimeConfig.egresadosUrl}
              target="_blank"
              rel="noreferrer"
            >
              Seguimiento de egresados &#8599;
            </a>
          </div>
        </article>
      </section>

      <section className={styles.section}>
        <SectionHeading
          eyebrow="Documentos"
          title="Documentos oficiales del programa disponibles en el portal TESCHA."
          description="Retícula oficial, objetivo de egreso, plan de aspirantes y más documentos institucionales del TecNM para la carrera de ISC."
        />

        <AnimatedGrid className={styles.resourceGrid}>
          {officialResources.map((resource) => (
            <AnimatedCard key={resource.href}>
              <a
                className={styles.resourceCard}
                href={resource.href}
                rel="noreferrer"
                target="_blank"
              >
                <p className={styles.cardLabel}>Fuente oficial</p>
                <h3>{resource.title}</h3>
                <p>{resource.description}</p>
              </a>
            </AnimatedCard>
          ))}
        </AnimatedGrid>
      </section>

    </main>
  );
}
