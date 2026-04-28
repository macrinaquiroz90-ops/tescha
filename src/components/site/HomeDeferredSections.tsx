import { SectionHeading } from "@/components/site/SectionHeading";
import { TrustNote } from "@/components/site/TrustNote";
import {
  AnimatedCard,
  AnimatedGrid,
  AnimatedSection,
} from "@/components/site/AnimatedSection";
import {
  differentiators,
  faqItems,
  marketDemand,
  salaryRanges,
  semesterTimeline,
  siteCopy,
} from "@/content/site";
import { siteRuntimeConfig } from "@/lib/site-config";
import styles from "@/app/page.module.css";

export function HomeDeferredSections() {
  const { contactEmail, officialProgramUrl, preregistroUrl, admissionsUrl } =
    siteRuntimeConfig;

  return (
    <>
      <AnimatedSection>
        <div className={styles.aspiranteHook}>
          <div className={styles.aspiranteLeft}>
            <p className={styles.aspiranteEyebrow}>Para quien est&aacute; decidiendo su carrera</p>
            <p className={styles.aspiranteTitle}>
              No necesitas saber programar para entrar.
              <br />
              Necesitas querer construir cosas.
            </p>
            <p className={styles.aspiranteDesc}>
              Si te gustan los videojuegos, las apps, las redes o simplemente
              &quot;c&oacute;mo funciona todo eso&quot;, ya tienes el perfil. ISC TESCHA
              empieza desde cero: l&oacute;gica, algoritmos y c&oacute;digo desde el primer semestre.
            </p>
          </div>
          <ul className={styles.aspiranteList}>
            <li>Empiezas desde l&oacute;gica y algoritmos</li>
            <li>No se requiere experiencia previa</li>
            <li>Aprender&aacute;s a programar en la carrera</li>
            <li>El plan te gu&iacute;a paso a paso, semestre a semestre</li>
          </ul>
        </div>
      </AnimatedSection>

      <AnimatedSection className={styles.section} id="mercado">
        <div className={styles.demandBanner}>
          <div className={styles.demandStat}>
            <span className={styles.demandNumber}>{marketDemand.stat}</span>
            <span className={styles.demandLabel}>{marketDemand.label}</span>
            <span className={styles.demandSource}>{marketDemand.source}</span>
          </div>
          <div className={styles.demandContent}>
            <p className={styles.demandContext}>{marketDemand.context}</p>
            <TrustNote compact className={styles.inlineTrustNote} />
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className={styles.section} id="ruta-semestral">
        <SectionHeading
          eyebrow="Lo que construyes semestre a semestre"
          title="Cada periodo tiene un hito concreto. No es teor&iacute;a, es obra."
          description="No esperas al &uacute;ltimo a&ntilde;o para ver resultados. Desde el primer semestre hay c&oacute;digo que corre, apps que funcionan y proyectos que puedes mostrar."
        />
        <div className={styles.semTimeline}>
          {semesterTimeline.map((item, i) => (
            <AnimatedSection key={item.sem} delay={i * 0.07}>
              <div className={styles.semItem}>
                <div className={styles.semDot} />
                <div className={styles.semContent}>
                  <span className={styles.semLabel}>{item.sem}</span>
                  <strong className={styles.semMilestone}>{item.milestone}</strong>
                  <p className={styles.semDetail}>{item.detail}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection className={styles.section} id="salarios">
        <SectionHeading
          eyebrow="El mercado paga bien, si de verdad sabes"
          title="Los n&uacute;meros son reales. El requisito tambi&eacute;n."
          description="Estos rangos existen. Pero no los gana quien solo pas&oacute; materias, los gana quien program&oacute;, practic&oacute;, construy&oacute; proyectos y am&oacute; el proceso. Si lo estudias solo por el sueldo, no llegar&aacute;s. Si lo amas, estos n&uacute;meros son tu piso."
        />
        <AnimatedGrid className={styles.salaryGrid} stagger={0.09}>
          {salaryRanges.map((item) => (
            <AnimatedCard key={item.role}>
              <article className={`${styles.salaryCard} ${styles[`salary_${item.color}`]}`}>
                <p className={styles.salaryRole}>{item.role}</p>
                <p className={styles.salaryRange}>{item.range}</p>
                <p className={styles.salaryNote}>{item.note}</p>
              </article>
            </AnimatedCard>
          ))}
        </AnimatedGrid>
        <p className={styles.salaryDisclaimer}>
          💡 Rangos estimados para el mercado mexicano 2024-2025 (MXN/mes bruto).
          Fuente: OCCMundial, LinkedIn Jobs, Glassdoor MX.
        </p>
        <TrustNote compact className={styles.salaryTrustNote} />
      </AnimatedSection>

      <AnimatedSection className={styles.section} id="valor">
        <SectionHeading
          eyebrow="Por qu&eacute; ISC TESCHA"
          title="Una carrera con formaci&oacute;n t&eacute;cnica real y reconocimiento nacional."
          description="Programa oficial TecNM, especialidades vigentes, residencia profesional y un perfil de egreso orientado al mercado laboral tecnol&oacute;gico regional y nacional."
        />
        <div className={styles.mHook}>
          <span className={styles.mHookEmoji}>&#x26A1;</span>
          <div className={styles.mHookBody}>
            <p className={styles.mHookTitle}>No solo aprendes a programar</p>
            <p className={styles.mHookDesc}>
              Aprendes a construir cosas que funcionan. Sistemas reales, datos reales, redes reales.
            </p>
          </div>
        </div>
        <AnimatedGrid className={styles.differentiatorGrid} stagger={0.08}>
          {differentiators.map((item) => (
            <AnimatedCard key={item.title}>
              <article className={styles.differentiatorCard}>
                <span className={styles.diffNumber}>{item.index}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            </AnimatedCard>
          ))}
        </AnimatedGrid>
      </AnimatedSection>

      <AnimatedSection className={styles.section} id="faq">
        <SectionHeading
          eyebrow="Preguntas frecuentes"
          title="Resolvemos las dudas m&aacute;s comunes sobre la carrera."
          description="Si tienes m&aacute;s preguntas, contacta directamente con la jefatura de divisi&oacute;n ISC o el departamento de admisiones del TESCHA."
        />
        <div className={styles.faqList}>
          {faqItems.slice(0, 4).map((item) => (
            <AnimatedCard key={item.q}>
              <details className={styles.faqItem}>
                <summary className={styles.faqSummary}>
                  <span>{item.q}</span>
                  <span className={styles.faqIcon} aria-hidden="true">+</span>
                </summary>
                <p className={styles.faqAnswer}>{item.a}</p>
                {"href" in item && item.href && (
                  <a
                    className={styles.faqLink}
                    href={item.href as string}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {(item as { hrefLabel?: string }).hrefLabel ?? (item.href as string)} &#8594;
                  </a>
                )}
              </details>
            </AnimatedCard>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection className={styles.section}>
        <div className={styles.ctaBanner} id="contacto">
          <div>
            <p className={styles.ctaLabel}>Siguiente paso</p>
            <h2>{siteCopy.cta.title}</h2>
            <p>{siteCopy.cta.description}</p>
          </div>
          <div className={styles.ctaActions}>
            <a className={styles.primaryAction} href={preregistroUrl} target="_blank" rel="noreferrer">
              Hacer preregistro &#8594;
            </a>
            <a className={styles.secondaryAction} href={admissionsUrl} target="_blank" rel="noreferrer">
              Portal admisiones
            </a>
            <a className={styles.secondaryAction} href={officialProgramUrl} target="_blank" rel="noreferrer">
              Ver programa oficial
            </a>
            <a className={styles.mailAction} href={`mailto:${contactEmail}`}>
              {contactEmail}
            </a>
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}
