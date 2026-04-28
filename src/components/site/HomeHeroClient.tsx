"use client";

import { motion, type Variants } from "framer-motion";
import { CountUp } from "@/components/site/AnimatedSection";
import { SkillsTicker } from "@/components/site/SkillsTicker";
import dynamic from "next/dynamic";
const TerminalWindow = dynamic(
  () => import("@/components/site/TerminalWindow").then((m) => m.TerminalWindow),
  { ssr: false, loading: () => <div style={{ minHeight: "160px" }} aria-hidden /> }
);
import { TrustNote } from "@/components/site/TrustNote";
import { heroMetrics, siteCopy } from "@/content/site";
import styles from "@/app/page.module.css";

const HeroScene3D = dynamic(
  () => import("@/components/site/HeroScene3D").then((mod) => mod.HeroScene3D),
  { ssr: false }
);

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export function HomeHeroClient() {
  return (
    <>
      <section className={`${styles.section} ${styles.heroSection}`} id="inicio">
        <div className={styles.heroBackdrop} aria-hidden="true" />
        <HeroScene3D />

        <motion.div
          className={styles.heroCopy}
          initial={false}
          animate="visible"
          variants={staggerContainer}
        >
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

          <motion.div variants={fadeUp} className={styles.heroProof}>
            <ul className={styles.heroProofList}>
              {siteCopy.hero.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeUp}>
            <TrustNote compact />
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.heroPanel}
          initial={false}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, ease: "circOut" }}
        >
          <div className={styles.panelEmblem}>
            <picture>
              <source srcSet="/logos/Logo_Ingenieria_Sistemas.webp" type="image/webp" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logos/Logo_Ingenieria_Sistemas_opt.png"
                alt="Logo Ingenieria en Sistemas Computacionales"
                className={styles.panelEmblemLogo}
              />
            </picture>
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
                initial={false}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.18,
                  delay: i * 0.03,
                  ease: "circOut",
                }}
              >
                <CountUp value={metric.value} className={styles.metricValue} />
                <h3>{metric.label}</h3>
                <p>{metric.description}</p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </section>

      <div className={styles.section}>
        <div className={styles.tickerSection}>
          <p className={styles.tickerLabel}>Tecnologías y materias del programa</p>
          <SkillsTicker />
        </div>
      </div>
    </>
  );
}
