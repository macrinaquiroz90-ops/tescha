import styles from "./TrustNote.module.css";

type TrustNoteProps = {
  className?: string;
  compact?: boolean;
};

export function TrustNote({ className, compact = false }: TrustNoteProps) {
  return (
    <p className={`${styles.note} ${compact ? styles.compact : ""} ${className ?? ""}`.trim()}>
      Basado en fuentes oficiales TESCHA y TecNM.
      <span className={styles.separator} aria-hidden="true">•</span>
      Revisión editorial: abril de 2026.
    </p>
  );
}
