import styles from "./SkillsTicker.module.css";

const SKILLS = [
  "Python", "JavaScript", "TypeScript", "Java", "React",
  "Node.js", "SQL", "MongoDB", "Docker", "Git",
  "APIs REST", "Machine Learning", "Linux", "Redes TCP/IP", "Scrum",
];

export function SkillsTicker() {
  const doubled = [...SKILLS, ...SKILLS];
  return (
    <>
      {/* Desktop: ticker animado */}
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
      {/* Móvil: todos visibles en grid */}
      <div className={styles.mobileGrid} aria-hidden="true">
        {SKILLS.map((skill) => (
          <span key={skill} className={styles.pill}>
            {skill}
          </span>
        ))}
      </div>
    </>
  );
}
