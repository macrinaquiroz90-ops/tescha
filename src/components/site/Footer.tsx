import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        <p className={styles.kicker}>ISC TESCHA</p>
        <p className={styles.copy}>
          Ingeniería en Sistemas Computacionales · Tecnológico de Estudios
          Superiores de Chalco · Tecnológico Nacional de México.
        </p>
        <p className={styles.credit}>
          Contenido orientado con referencias oficiales del TESCHA y TecNM.
          Revisión editorial: abril de 2026.
        </p>
      </div>
      <p className={styles.legal}>
        {new Date().getFullYear()} · Chalco, Estado de México
      </p>
    </footer>
  );
}
