import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/SectionHeading";
import {
  aspirantPath,
  divisionContact,
  entryProfile,
  institutionalContact,
  officialResources,
} from "@/content/site";
import { siteRuntimeConfig } from "@/lib/site-config";
import styles from "../section-page.module.css";

export const metadata: Metadata = {
  title: "Contacto | ISC TESCHA",
  description:
    "Canales oficiales, ubicación y recursos de contacto para aspirantes de ISC TESCHA.",
};

export default function ContactPage() {
  return (
    <main className={styles.page}>
      <PageHero
        eyebrow="Contacto"
        title="Todo lo que necesitas para comunicarte con ISC TESCHA."
        description="Ubicación, teléfonos, correo institucional y redes oficiales. Más una guía paso a paso para aspirantes que ya quieren iniciar su proceso de admisión."
        accent="Canales oficiales del Tecnológico de Estudios Superiores de Chalco"
      />

      <section className={styles.section}>
        <SectionHeading
          eyebrow="Ruta de aspirante"
          title="Tres pasos para pasar de interés a ingreso formal."
          description="Explorar el programa, consultar la convocatoria y contactar directamente al TESCHA: el camino más directo cuando ya tomaste la decisión."
        />

        <div className={styles.pathGrid}>
          {aspirantPath.map((item) => (
            <article className={styles.pathCard} key={item.step}>
              <p className={styles.cardLabel}>{item.step}</p>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <SectionHeading
          eyebrow="Perfil de ingreso"
          title="Habilidades deseables en el aspirante a ISC TESCHA."
          description="No se requieren conocimientos técnicos previos. Estas son las habilidades de base que el programa valorará en el aspirante."
        />
        <article className={styles.featureCard}>
          <ul className={styles.chipList}>
            {entryProfile.map((skill) => (
              <li className={styles.chip} key={skill}>{skill}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className={styles.section}>
        <SectionHeading
          eyebrow="Canales oficiales"
          title="Ubicación del campus, teléfonos, correo y redes sociales."
          description="Datos institucionales del Tecnológico de Estudios Superiores de Chalco para la carrera de Ingeniería en Sistemas Computacionales."
        />

        <div className={styles.contactGrid}>
          <article className={styles.contactCard}>
            <p className={styles.cardLabel}>Campus</p>
            <h3>{institutionalContact.campus}</h3>
            <p>{institutionalContact.address}</p>
          </article>
          <article className={styles.contactCard}>
            <p className={styles.cardLabel}>Comunicación</p>
            <ul className={styles.contactList}>
              {institutionalContact.phones.map((phone) => (
                <li key={phone}>
                  <a href={`tel:${phone.replace(/[^0-9+]/g, "")}`}>{phone}</a>
                </li>
              ))}
              <li>
                <a href={`mailto:${institutionalContact.email}`}>
                  {institutionalContact.email}
                </a>
              </li>
              <li>
                <a href={institutionalContact.facebook} rel="noreferrer" target="_blank">
                  Facebook TESCHA
                </a>
              </li>
            </ul>
          </article>
          <article className={styles.contactCard}>
            <p className={styles.cardLabel}>Acción</p>
            <h3>Enlaces directos</h3>
            <div className={styles.actions}>
              <a className={styles.action} href={siteRuntimeConfig.admissionsUrl}>
                Admisiones
              </a>
              <a
                className={styles.secondaryAction}
                href={siteRuntimeConfig.officialProgramUrl}
              >
                Programa ISC
              </a>
            </div>
          </article>
        </div>
      </section>

      <section className={styles.section}>
        <SectionHeading
          eyebrow="Jefatura ISC"
          title="Contacto directo con la División de Sistemas Computacionales."
          description="Para dudas sobre la carrera, especialidades, evaluaciones o situación académica, contacta directamente a la jefatura de división ISC."
        />
        <div className={styles.contactGrid}>
          <article className={styles.contactCard}>
            <p className={styles.cardLabel}>Jefe de división</p>
            <h3>{divisionContact.title}</h3>
            <p>{divisionContact.head}</p>
          </article>
          <article className={styles.contactCard}>
            <p className={styles.cardLabel}>Horario</p>
            <p>{divisionContact.hours}</p>
            <p className={styles.cardLabel} style={{marginTop: "0.75rem"}}>Extensión</p>
            <p>{divisionContact.extension}</p>
          </article>
          <article className={styles.contactCard}>
            <p className={styles.cardLabel}>Comunicación</p>
            <ul className={styles.contactList}>
              {divisionContact.phones.map((phone) => (
                <li key={phone}><a href={`tel:${phone.replace(/[^0-9+]/g, "")}`}>{phone}</a></li>
              ))}
              <li><a href={`mailto:${divisionContact.email}`}>{divisionContact.email}</a></li>
              <li><a href={divisionContact.facebook} rel="noreferrer" target="_blank">Facebook ISC TESCHA</a></li>
            </ul>
          </article>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.banner}>
          <div>
            <p className={styles.cardLabel}>Convocatoria vigente</p>
            <h2>Convocatoria de ingreso 2025–2026 disponible en el portal TESCHA.</h2>
            <p>Consulta fechas, requisitos y proceso oficial de admisión.</p>
          </div>
          <div className={styles.actions}>
            <a
              className={styles.action}
              href={siteRuntimeConfig.admissionsUrl}
              rel="noreferrer"
              target="_blank"
            >
              Ver convocatoria &#8594;
            </a>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <SectionHeading
          eyebrow="Fuentes"
          title="Consulta las fuentes oficiales del programa."
          description="Toda la información de este sitio tiene respaldo directo en el portal institucional del TESCHA y la plataforma del TecNM."
        />

        <div className={styles.resourceGrid}>
          {officialResources.slice(0, 3).map((resource) => (
            <a
              className={styles.resourceCard}
              href={resource.href}
              key={resource.href}
              rel="noreferrer"
              target="_blank"
            >
              <p className={styles.cardLabel}>Fuente oficial</p>
              <h3>{resource.title}</h3>
              <p>{resource.description}</p>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
