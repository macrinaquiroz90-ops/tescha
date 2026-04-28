import { HeroCanvas } from "./HeroCanvas";
import styles from "./PageHero.module.css";
import heroStyles from "./HeroCanvas.module.css";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  accent?: string;
  children?: React.ReactNode;
};

export function PageHero({
  eyebrow,
  title,
  description,
  accent,
  children,
}: PageHeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.copy}>
        <canvas className={heroStyles.canvas} aria-hidden="true" />
        <HeroCanvas />
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
        {children}
      </div>

      <div className={styles.panel}>
        <div className={styles.symbolWrap}>
          <svg className={styles.symbol} viewBox="0 0 120 120" aria-hidden="true">
            <circle cx="60" cy="60" r="22" />
            <path d="M60 8v14M60 98v14M8 60h14M98 60h14M22 22l10 10M88 88l10 10M22 98l10-10M88 32l10-10" />
            <path d="M44 65c7-17 20-26 41-27" />
            <path d="M51 81c11-10 23-15 38-16" />
          </svg>
        </div>
        <p className={styles.accentLabel}>Sistema visual</p>
        <h2>{accent ?? "Identidad técnica con carácter institucional"}</h2>
        <p>
          La interfaz mantiene el lenguaje de producto, pero aterriza el
          contenido al ecosistema académico del TESCHA.
        </p>
      </div>
    </section>
  );
}
