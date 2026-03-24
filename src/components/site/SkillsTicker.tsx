import styles from "./SkillsTicker.module.css";

const SKILLS = [
  "Python", "JavaScript", "TypeScript", "Java", "C++", "SQL",
  "React", "Node.js", "Django", "Spring Boot", "Flutter",
  "MySQL", "MongoDB", "PostgreSQL", "Redis",
  "Docker", "Linux", "Redes TCP/IP", "Cisco",
  "Inteligencia Artificial", "Machine Learning", "Análisis de Datos",
  "Git", "GitHub", "Scrum", "Programación Web", "Programación Móvil",
  "Bases de Datos", "Ciberseguridad", "Cloud Computing",
  "Industria 4.0", "IoT", "Automatización", "E-commerce",
  "Arquitectura de Software", "APIs REST", "Microservicios",
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
