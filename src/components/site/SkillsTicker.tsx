import styles from "./SkillsTicker.module.css";

const SKILLS = [
  "Python", "JavaScript", "TypeScript", "Java", "React",
  "Node.js", "SQL", "MongoDB", "Docker", "Git",
  "APIs REST", "Machine Learning", "Linux", "Redes TCP/IP", "Scrum",
];

export function SkillsTicker() {
  return (
    <div className={styles.grid}>
      {SKILLS.map((skill) => (
        <span key={skill} className={styles.pill}>
          {skill}
        </span>
      ))}
    </div>
  );
}
