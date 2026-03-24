import styles from "./SectionHeading.module.css";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  counter?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  counter,
}: SectionHeadingProps) {
  return (
    <div className={styles.wrapper}>
      {counter && <span className={styles.counter} aria-hidden="true">{counter}</span>}
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
    </div>
  );
}
