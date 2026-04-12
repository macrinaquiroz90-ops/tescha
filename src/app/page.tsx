"use client";

import { motion, type Variants } from "framer-motion";
import { SectionHeading } from "@/components/site/SectionHeading";
import { AnimatedSection, AnimatedGrid, AnimatedCard, CountUp } from "@/components/site/AnimatedSection";
import { HeroCanvas } from "@/components/site/HeroCanvas";
import { SkillsTicker } from "@/components/site/SkillsTicker";
import { TerminalWindow } from "@/components/site/TerminalWindow";
import { ScrollToTop } from "@/components/site/ScrollToTop";
import {
  convocatoriaNotice,
  differentiators,
  faqItems,
  heroMetrics,
  siteCopy,
  testimonials,
} from "@/content/site";
import { siteRuntimeConfig } from "@/lib/site-config";
import styles from "./page.module.css";

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  const { admissionsUrl, contactEmail, officialProgramUrl } = siteRuntimeConfig;

  return (
    <div className={styles.pageShell}>
      <main className={styles.page}>

        {/* HERO */}
        <section className={`${styles.section} ${styles.heroSection}`} id="inicio">
          <HeroCanvas />
          <div className={styles.heroBackdrop} aria-hidden="true" />

          <motion.div
            className={styles.heroCopy}
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.a
              variants={fadeUp}
              href={convocatoriaNotice.href}
              target="_blank"
              rel="noreferrer"
              className={styles.convoBadge}
            >
              <span className={styles.convoBadgeDot} aria-hidden="true" />
              {convocatoriaNotice.text}
              <span aria-hidden="true">&#8594;</span>
            </motion.a>

            <motion.div variants={fadeUp} className={styles.heroBadge}>
              <span className={styles.heroBadgeDot} />
              {siteCopy.hero.lead}
            </motion.div>

            <motion.h1 variants={fadeUp} className={styles.heroTitle}>
              {siteCopy.hero.title}
            </motion.h1>
            <motion.p variants={fadeUp} className={styles.heroDescription}>
              {siteCopy.hero.description}
            </motion.p>

            <motion.div variants={fadeUp} className={styles.heroActions}>
              <a className={styles.primaryAction} href={admissionsUrl} target="_blank" rel="noreferrer">
                Ir a admisiones &#8594;
              </a>
              <a className={styles.secondaryAction} href="/plan-estudios">
                Ver plan de estudios
              </a>
            </motion.div>

            <motion.div variants={fadeUp} className={styles.heroProof}>
              <p>{siteCopy.hero.caption}</p>
              <ul className={styles.heroProofList}>
                {siteCopy.hero.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          <motion.div
            className={styles.heroPanel}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "circOut" }}
          >
            <div className={styles.panelEmblem}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logos/Logo_Ingenieria_Sistemas.png"
                alt="Logo Ingenieria en Sistemas Computacionales"
                className={styles.panelEmblemLogo}
              />
              <div className={styles.panelEmblemText}>
                <span className={styles.panelEmblemAbbr}>ISC</span>
                <p className={styles.panelEmblemSub}>TESCHA · TecNM</p>
              </div>
              <span className={styles.panelEmblemBadge}>Oficial</span>
            </div>

            <TerminalWindow />

            <div className={styles.metricGrid}>
              {heroMetrics.map((metric, i) => (
                <motion.article
                  className={styles.metricCard}
                  key={metric.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.1, ease: "circOut" }}
                >
                  <CountUp value={metric.value} className={styles.metricValue} />
                  <h3>{metric.label}</h3>
                  <p>{metric.description}</p>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </section>

        {/* TICKER */}
        <AnimatedSection className={styles.tickerSection}>
          <p className={styles.tickerLabel}>Tecnologías y materias del programa</p>
          <SkillsTicker />
        </AnimatedSection>

        {/* ASPIRANTE HOOK */}
        <AnimatedSection>
          <div className={styles.aspiranteHook}>
            <div className={styles.aspiranteLeft}>
              <p className={styles.aspiranteEyebrow}>Para quien está decidiendo su carrera</p>
              <p className={styles.aspiranteTitle}>
                No necesitas saber programar para entrar.<br />
                Necesitas querer construir cosas.
              </p>
              <p className={styles.aspiranteDesc}>
                Si te gustan los videojuegos, las apps, las redes o simplemente "cómo funciona todo eso", ya tienes el perfil. ISC TESCHA empieza desde cero: lógica, algoritmos y código desde el primer semestre.
              </p>
            </div>
            <ul className={styles.aspiranteList}>
              <li>Empiezas desde lógica y algoritmos</li>
              <li>No se requiere experiencia previa</li>
              <li>Aprenderás a programar en la carrera</li>
              <li>El plan te guía paso a paso, semestre a semestre</li>
            </ul>
          </div>
        </AnimatedSection>

        {/* POR QUE ISC TESCHA */}
        <AnimatedSection className={styles.section} id="valor">
          <SectionHeading
            eyebrow="Por qué ISC TESCHA"
            title="Una carrera con formación técnica real y reconocimiento nacional."
            description="Programa oficial TecNM, especialidades vigentes, residencia profesional y un perfil de egreso orientado al mercado laboral tecnológico regional y nacional."
          />
          <div className={styles.mHook}>
            <span className={styles.mHookEmoji}>&#x26A1;</span>
            <div className={styles.mHookBody}>
              <p className={styles.mHookTitle}>No solo aprendes a programar</p>
              <p className={styles.mHookDesc}>Aprendes a construir cosas que funcionan. Sistemas reales, datos reales, redes reales.</p>
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

        {/* TESTIMONIOS */}
        <AnimatedSection className={styles.section} id="testimonios">
          <SectionHeading
            eyebrow="Testimonios"
            title="Lo que dicen egresados y empresas sobre ISC TESCHA."
            description="Opiniones de quienes pasaron por la carrera y de empleadores que han contratado egresados del programa."
          />
          <AnimatedGrid className={styles.testimonialGrid} stagger={0.1}>
            {testimonials.map((t) => (
              <AnimatedCard key={t.name}>
                <article className={styles.testimonialCard}>
                  <p className={styles.testimonialQuote}>{t.quote}</p>
                  <div className={styles.testimonialMeta}>
                    <span className={styles.testimonialName}>{t.name}</span>
                    <span className={styles.testimonialRole}>{t.role}</span>
                    <span className={styles.testimonialOrg}>{t.org}</span>
                  </div>
                </article>
              </AnimatedCard>
            ))}
          </AnimatedGrid>
        </AnimatedSection>

        {/* PREGUNTAS FRECUENTES */}
        <AnimatedSection className={styles.section} id="faq">
          <SectionHeading
            eyebrow="Preguntas frecuentes"
            title="Resolvemos las dudas más comunes sobre la carrera."
            description="Si tienes más preguntas, contacta directamente con la jefatura de división ISC o el departamento de admisiones del TESCHA."
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
                </details>
              </AnimatedCard>
            ))}
          </div>
        </AnimatedSection>

        {/* CTA */}
        <AnimatedSection className={styles.section}>
          <div className={styles.ctaBanner} id="contacto">
            <div>
              <p className={styles.ctaLabel}>Siguiente paso</p>
              <h2>{siteCopy.cta.title}</h2>
              <p>{siteCopy.cta.description}</p>
            </div>
            <div className={styles.ctaActions}>
              <a className={styles.primaryAction} href={admissionsUrl} target="_blank" rel="noreferrer">
                Ir a admisiones &#8594;
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

      </main>
      <ScrollToTop />
    </div>
  );
}