"use client";

import { useRef, useState, useEffect } from "react";
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

export function TerminalWindow() {
  const ref = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<string[]>(() => SCRIPT.map(() => ""));
  const currentRef = useRef({ line: 0, char: 0 });
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setStarted(true);
        io.disconnect();
      }
    }, { threshold: 0.1 });

    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let cancelled = false;

    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    const run = async () => {
      while (!cancelled) {
        const { line, char } = currentRef.current;

        // If we've finished all lines, pause, clear and restart
        if (line >= SCRIPT.length) {
          await sleep(1200 + Math.random() * 800);
          if (cancelled) break;
          setLines(() => SCRIPT.map(() => ""));
          currentRef.current = { line: 0, char: 0 };
          continue;
        }

        const entry = SCRIPT[line];

        if (entry.kind === "cmd") {
          const target = entry.text;
          if (char < target.length) {
            const baseDelay = 20 + Math.random() * 40;
            await sleep(baseDelay);
            if (cancelled) break;
            setLines((prev) => {
              const copy = prev.slice();
              copy[line] = target.slice(0, char + 1);
              return copy;
            });
            currentRef.current.char = char + 1;
          } else {
            await sleep(420);
            if (cancelled) break;
            currentRef.current = { line: line + 1, char: 0 };
          }
        } else {
          // output lines appear instantly after short pause
          await sleep(300 + Math.random() * 180);
          if (cancelled) break;
          setLines((prev) => {
            const copy = prev.slice();
            copy[line] = entry.text;
            return copy;
          });
          currentRef.current = { line: line + 1, char: 0 };
        }
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [started]);

  return (
    <div className={styles.window} ref={ref}>
      <div className={styles.bar}>
        <span className={`${styles.dot} ${styles.dotRed}`} />
        <span className={`${styles.dot} ${styles.dotYellow}`} />
        <span className={`${styles.dot} ${styles.dotGreen}`} />
        <span className={styles.barTitle}>isc@tescha  ~/proyectos</span>
      </div>
      <pre className={styles.body} aria-label="Terminal animado de ejemplo">
        {SCRIPT.map((l, i) => (
          <div key={i} className={`${styles.line} ${styles[l.kind]}`}>
            {lines[i] || (l.kind === "cmd" ? "" : "")}
          </div>
        ))}
        <div className={`${styles.line} ${styles.cmd}`}>
          ${" "}
          <span className={styles.cursor} aria-hidden="true" />
        </div>
      </pre>
    </div>
  );
}
