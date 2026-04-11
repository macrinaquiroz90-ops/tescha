import styles from "./SkillsTicker.module.css";

const ROW1 = ["Python", "JavaScript", "TypeScript", "Java", "React", "Node.js", "SQL", "MongoDB"];
const ROW2 = ["Docker", "Git", "APIs REST", "Machine Learning", "Linux", "Redes TCP/IP", "Scrum", "C++"];

function TickerRow({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const tripled = [...items, ...items, ...items];
  return (
    <div className={styles.row}>
      <div className={`${styles.track} ${reverse ? styles.trackReverse : ""}`}>
        {tripled.map((skill, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: ticker display list
          <span key={i} className={styles.pill}>{skill}</span>
        ))}
      </div>
    </div>
  );
}

export function SkillsTicker() {
  return (
    <div className={styles.wrapper}>
      <TickerRow items={ROW1} />
      <TickerRow items={ROW2} reverse />
    </div>
  );
}
