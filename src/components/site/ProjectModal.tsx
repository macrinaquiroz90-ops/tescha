"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./ProjectModal.module.css";

export type ProjectModalData = {
  title: string;
  technologies: string[];
  steps: { bold: string; detail: string }[];
  semesterInfo: string;
};

type Props = {
  data: ProjectModalData;
  onClose: () => void;
};

export function ProjectModal({ data, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.showModal();
    closeButtonRef.current?.focus();
    const handleCancel = () => onClose();
    el.addEventListener("cancel", handleCancel);
    return () => {
      el.removeEventListener("cancel", handleCancel);
      if (el.open) el.close();
    };
  }, [onClose]);

  const handleBackdrop = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === ref.current) onClose();
  };

  return (
    <dialog
      ref={ref}
      className={styles.dialog}
      onClick={handleBackdrop}
      aria-labelledby="project-modal-title"
    >
      <div className={styles.panel}>

        <div className={styles.header}>
          <h2 className={styles.title} id="project-modal-title">{data.title}</h2>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Cerrar modal"
            ref={closeButtonRef}
          >
            ✕
          </button>
        </div>

        <section>
          <p className={styles.blockLabel}>Tecnologías usadas</p>
          <div className={styles.tags}>
            {data.technologies.map((t) => (
              <span key={t} className={styles.tag}>{t}</span>
            ))}
          </div>
        </section>

        <section>
          <p className={styles.blockLabel}>¿Cómo se construye paso a paso?</p>
          <ol className={styles.steps}>
            {data.steps.map((step, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: ordered list, index is intentional
              <li key={i} className={styles.step}>
                <span className={styles.stepNum}>{i + 1}</span>
                <span>
                  <strong>{step.bold}</strong> — {step.detail}
                </span>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <p className={styles.blockLabel}>¿Dónde lo aprendes en ISC TESCHA?</p>
          <p className={styles.semesterText}>{data.semesterInfo}</p>
          <p className={styles.metaNote}>Referencia orientativa basada en la progresión del plan y materias visibles del programa.</p>
        </section>

        <div className={styles.actions}>
          <Link href="/plan-estudios" className={styles.btnPrimary} onClick={onClose}>
            Ver plan de estudios
          </Link>
          <button type="button" className={styles.btnSecondary} onClick={onClose}>
            Cerrar ↓
          </button>
        </div>

      </div>
    </dialog>
  );
}
