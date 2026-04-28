import { HomeHeroClient } from "@/components/site/HomeHeroClient";
import { HomeDeferredSections } from "@/components/site/HomeDeferredSections";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.pageShell}>
      <main className={styles.page}>
        <HomeHeroClient />
        <HomeDeferredSections />
      </main>
    </div>
  );
}
