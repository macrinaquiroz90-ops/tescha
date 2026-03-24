"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import styles from "./TerminalWindow.module.css";

type Kind = "cmd" | "out" | "ok";
type ScriptLine = { text: string; kind: Kind };

const SCRIPT: ScriptLine[] = [
  { text: "$ python3 detector_anomalias.py", kind: "cmd" },
  { text: "  Cargando logs: 42,891 eventos...", kind: "out" },
  { text: "  Entrenando IsolationForest...", kind: "out" },
  { text: "  Anomalias detectadas: 23  [OK]", kind: "ok" },
  { text: "$ git push origin feature/api-rest", kind: "cmd" },
  { text: "  main -> origin/main  [OK]", kind: "ok" },
  { text: "$ docker compose up -d", kind: "cmd" },
  { text: "  Network api-isc created  [OK]", kind: "ok" },
  { text: "  Container redis-cache  Started  [OK]", kind: "ok" },
  { text: "  Container api-main  Started  [OK]", kind: "ok" },
];

const DELAY: Record<Kind, number> = { cmd: 46, out: 18, ok: 22 };

export function TerminalWindow() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const [done, setDone] = useState<ScriptLine[]>([]);
  const [typing, setTyping] = useState("");
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (inView) setActive(true);
  }, [inView]);

  useEffect(() => {
    if (!active || lineIdx >= SCRIPT.length) return;

    const line = SCRIPT[lineIdx];
    const target = line.text;

    if (charIdx < target.length) {
      const pause = charIdx === 0 && lineIdx > 0 ? 380 : DELAY[line.kind];
      const id = setTimeout(() => {
        setTyping(target.slice(0, charIdx + 1));
        setCharIdx((c) => c + 1);
      }, pause);
      return () => clearTimeout(id);
    }

    const id = setTimeout(() => {
      setDone((prev) => [...prev, line]);
      setTyping("");
      setCharIdx(0);
      setLineIdx((l) => l + 1);
    }, 110);
    return () => clearTimeout(id);
  }, [active, lineIdx, charIdx]);

  return (
    <div className={styles.window} ref={ref}>
      <div className={styles.bar}>
        <span className={`${styles.dot} ${styles.dotRed}`} />
        <span className={`${styles.dot} ${styles.dotYellow}`} />
        <span className={`${styles.dot} ${styles.dotGreen}`} />
        <span className={styles.barTitle}>isc@tescha  ~/proyectos</span>
      </div>
      <pre className={styles.body} aria-label="Terminal animado de ejemplo">
        {done.map((l, i) => (
          <div key={i} className={`${styles.line} ${styles[l.kind]}`}>
            {l.text}
          </div>
        ))}
        {lineIdx < SCRIPT.length && (
          <div className={`${styles.line} ${styles[SCRIPT[lineIdx].kind]}`}>
            {typing}
            <span className={styles.cursor} aria-hidden="true" />
          </div>
        )}
        {lineIdx >= SCRIPT.length && (
          <div className={`${styles.line} ${styles.cmd}`}>
            ${" "}
            <span className={styles.cursor} aria-hidden="true" />
          </div>
        )}
      </pre>
    </div>
  );
}
