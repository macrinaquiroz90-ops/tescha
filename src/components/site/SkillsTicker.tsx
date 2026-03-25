import styles from "./SkillsTicker.module.css";

const SKILLS = [
  "Python", "JavaScript", "TypeScript", "Java", "React",
  "Node.js", "SQL", "MongoDB", "Docker", "Git",
  "APIs REST", "Machine Learning", "Linux", "Redes TCP/IP", "Scrum",
];

export function SkillsTicker() {
  const doubled = [...SKILLS, ...SKILLS];
  return (
    <div className={styles.wrapper} aria-hidden="true">
      <div className={styles.track}>
        {doubled.map((skill, i) => (
          <span
            // biome-ignore lint/suspicious/noArrayIndexKey: ticker display list, order is fixed
            key={i}
            className={styles.pill}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
