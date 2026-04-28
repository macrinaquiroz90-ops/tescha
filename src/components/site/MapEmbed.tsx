"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./MapEmbed.module.css";

export function MapEmbed() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.div
      ref={ref}
      className={styles.wrapper}
      initial={{ opacity: 0, scale: 0.97, y: 24 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: "circOut" }}
    >
      {!loaded && <div className={styles.skeleton} aria-hidden="true" />}
      <iframe
        src="https://maps.google.com/maps?q=Tecnol%C3%B3gico+de+Estudios+Superiores+de+Chalco&t=&z=15&ie=UTF8&iwloc=&output=embed"
        className={`${styles.frame} ${loaded ? styles.frameVisible : ""}`}
        loading="lazy"
        title="Cómo llegar al TESCHA"
        referrerPolicy="no-referrer-when-downgrade"
        onLoad={() => setLoaded(true)}
      />

      {/* HUD overlay — pointer-events none para no bloquear el mapa */}
      <div className={styles.hud} aria-hidden="true">
        {/* Barra superior */}
        <div className={styles.hudTop}>
          <span className={styles.hudBlink} />
          <span className={styles.hudLabel}>LOCALIZACIÓN · TESCHA</span>
          <span className={styles.hudCoords}>19.2612° N &nbsp;98.9095° O</span>
        </div>

        {/* Brackets en esquinas */}
        <div className={`${styles.corner} ${styles.cornerTL}`} />
        <div className={`${styles.corner} ${styles.cornerTR}`} />
        <div className={`${styles.corner} ${styles.cornerBL}`} />
        <div className={`${styles.corner} ${styles.cornerBR}`} />

        {/* Línea de escaneo */}
        <div className={styles.scanLine} />

        {/* Etiqueta de estado */}
        <div className={styles.hudStatus}>
          <span className={styles.statusDot} />
          SEÑAL ACTIVA
        </div>
      </div>
    </motion.div>
  );
}
