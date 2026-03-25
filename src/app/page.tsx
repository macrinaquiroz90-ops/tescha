"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { SectionHeading } from "@/components/site/SectionHeading";
import { AnimatedSection, AnimatedGrid, AnimatedCard, CountUp } from "@/components/site/AnimatedSection";
import { HeroCanvas } from "@/components/site/HeroCanvas";
import { SkillsTicker } from "@/components/site/SkillsTicker";
import { TerminalWindow } from "@/components/site/TerminalWindow";
import { NeuralNetCanvas, MatrixRainCanvas, SortBarsCanvas, NetTopoCanvas } from "@/components/site/TechDemos";
import demoStyles from "@/components/site/TechDemos.module.css";
import {
  differentiators,
  divisionContact,
  experienceBlocks,
  graduateProfile,
  heroMetrics,
  homeRouteCards,
  institutionalContact,
  innovationPillars,
  learningTracks,
  officialProgram,
  roadmapPhases,
  siteCopy,
} from "@/content/site";
import { siteRuntimeConfig } from "@/lib/site-config";
import styles from "./page.module.css";

const techCategories = [
  {
    icon: "</>",
    color: "accent",
    title: "Desarrollo de Software",
    items: ["Python", "Java", "JavaScript", "C++", "TypeScript"],
    description: "Lenguajes con demanda alta en la industria regional y nacional.",
  },
  {
    icon: "[~]",
    color: "violet",
    title: "Web & Móvil",
    items: ["React", "Node.js", "Flutter", "APIs REST", "HTML/CSS"],
    description: "Desarrollo de aplicaciones web y apps para dispositivos móviles.",
  },
  {
    icon: "[*]",
    color: "orange",
    title: "Datos & IA",
    items: ["SQL", "MongoDB", "Machine Learning", "Analítica", "Visualización"],
    description: "Bases de datos, inteligencia artificial y ciencia de datos aplicada.",
  },
  {
    icon: "[+]",
    color: "green",
    title: "Infraestructura",
    items: ["Linux", "Redes TCP/IP", "Cisco", "Ciberseguridad", "Cloud"],
    description: "Administración de redes, sistemas operativos y seguridad informática.",
  },
  {
    icon: "[i]",
    color: "violet",
    title: "Industria 4.0",
    items: ["IoT", "Automatización", "Sistemas programables", "Robótica", "SCADA"],
    description: "Transformación digital, sistemas embebidos y manufactura inteligente.",
  },
  {
    icon: "[$]",
    color: "orange",
    title: "Negocio Digital",
    items: ["E-commerce", "Plataformas", "UX/UI", "Marketing Digital", "ERP"],
    description: "Comercio electrónico, operación digital y gestión de plataformas.",
  },
];

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  const { admissionsUrl, contactEmail, officialProgramUrl } = siteRuntimeConfig;

  return (
    <div className={styles.pageShell}>
      <main className={styles.page}>

        {/* HERO */}
        <section className={`${styles.section} ${styles.heroSection}`} id="inicio">
          <HeroCanvas />
          <div className={styles.heroBackdrop} aria-hidden="true" />

          <motion.div
            className={styles.heroCopy}
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} className={styles.heroBadge}>
              <span className={styles.heroBadgeDot} />
              {siteCopy.hero.lead}
            </motion.div>

            <motion.h1 variants={fadeUp} className={styles.heroTitle}>
              {siteCopy.hero.title}
            </motion.h1>
            <motion.p variants={fadeUp} className={styles.heroDescription}>
              {siteCopy.hero.description}
            </motion.p>

            <motion.div variants={fadeUp} className={styles.heroActions}>
              <a className={styles.primaryAction} href="#tecnologias">
                Ver qué aprenderás
              </a>
              <a className={styles.secondaryAction} href={admissionsUrl} target="_blank" rel="noreferrer">
                Ir a admisiones
              </a>
            </motion.div>

            <motion.div variants={fadeUp} className={styles.heroProof}>
              <p>{siteCopy.hero.caption}</p>
              <ul className={styles.heroProofList}>
                {siteCopy.hero.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          <motion.div
            className={styles.heroPanel}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "circOut" }}
          >
            <div className={styles.panelEmblem}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logos/Logo_Ingenieria_Sistemas.png"
                alt="Logo Ingenieria en Sistemas Computacionales"
                className={styles.panelEmblemLogo}
              />
              <div className={styles.panelEmblemText}>
                <span className={styles.panelEmblemAbbr}>ISC</span>
                <p className={styles.panelEmblemSub}>TESCHA · TecNM</p>
              </div>
              <span className={styles.panelEmblemBadge}>Oficial</span>
            </div>

            <TerminalWindow />

            <div className={styles.metricGrid}>
              {heroMetrics.map((metric, i) => (
                <motion.article
                  className={styles.metricCard}
                  key={metric.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.1, ease: "circOut" }}
                >
                  <CountUp value={metric.value} className={styles.metricValue} />
                  <h3>{metric.label}</h3>
                  <p>{metric.description}</p>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </section>

        {/* TICKER */}
        <AnimatedSection className={styles.tickerSection}>
          <p className={styles.tickerLabel}>Tecnologías y materias del programa</p>
          <SkillsTicker />
        </AnimatedSection>

        {/* NAV CARDS */}
        <AnimatedSection className={styles.section}>
          <SectionHeading
            counter="01"
            eyebrow="Explora la carrera"
            title="Todo lo que necesitas saber sobre ISC TESCHA está aquí."
            description="Plan de estudios, especialidades, perfil de egreso y datos de contacto institucional, organizados para aspirantes, estudiantes y empresas que buscan egresados."
          />
          <AnimatedGrid className={styles.routeCardGrid} stagger={0.1}>
            {homeRouteCards.map((card) => (
              <AnimatedCard key={card.href}>
                <Link className={styles.routeCard} href={card.href}>
                  <p className={styles.cardIndex}>{card.label}</p>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                  <span className={styles.cardArrow} aria-hidden="true">&#8594;</span>
                </Link>
              </AnimatedCard>
            ))}
          </AnimatedGrid>
        </AnimatedSection>

        {/* PROGRAMA OFICIAL */}
        <AnimatedSection className={styles.section} id="programa">
          <SectionHeading
            counter="02"
            eyebrow="Programa oficial"
            title="ISC TESCHA: objetivo formativo, visión y especialidades del programa."
            description="El plan de estudios está respaldado por el Tecnológico Nacional de México. Conoce el objetivo formativo, la bienvenida institucional y las especialidades activas del programa."
          />

          <div className={styles.programBanner}>
            <Image
              src="/images/ISC.png"
              alt="Ingenieria en Sistemas Computacionales — TESCHA"
              width={1920}
              height={480}
              className={styles.programBannerImg}
              priority={false}
            />
          </div>
          <AnimatedGrid className={styles.programGrid} stagger={0.12}>
            <AnimatedCard>
              <article className={styles.statementCard}>
                <p className={styles.cardIndex}>Bienvenida</p>
                <h3>Una academia que plantea disciplina y proyección profesional</h3>
                <p>{officialProgram.welcome}</p>
              </article>
            </AnimatedCard>
            <AnimatedCard>
              <article className={styles.statementCard}>
                <p className={styles.cardIndex}>Objetivo</p>
                <h3>Formación con criterio técnico, ético y visión estratégica</h3>
                <p>{officialProgram.objective}</p>
              </article>
            </AnimatedCard>
          </AnimatedGrid>
          <AnimatedGrid className={styles.specialtyGrid} stagger={0.1}>
            {officialProgram.specialties.map((specialty) => (
              <AnimatedCard key={specialty.title}>
                <article className={styles.specialtyCard}>
                  <p className={styles.opsLabel}>Especialidad activa</p>
                  <h3>{specialty.title}</h3>
                  <p>{specialty.description}</p>
                </article>
              </AnimatedCard>
            ))}
          </AnimatedGrid>
        </AnimatedSection>

        {/* QUE VAS A APRENDER */}
        <AnimatedSection className={styles.section} id="tecnologias">
          <SectionHeading
            counter="03"
            eyebrow="Qué aprenderás"
            title="Seis áreas tecnológicas con aplicación directa en la industria."
            description="El programa cubre desde programación y bases de datos hasta redes, industria 4.0, inteligencia artificial y comercio electrónico. Esto es lo que construirás a lo largo de la carrera."
          />
          <AnimatedGrid className={styles.techGrid} stagger={0.08}>
            {techCategories.map((cat) => (
              <AnimatedCard key={cat.title}>
                <article className={`${styles.techCard} ${styles["tech_" + cat.color]}`}>
                  <span className={styles.techIcon} aria-hidden="true">{cat.icon}</span>
                  <h3>{cat.title}</h3>
                  <p>{cat.description}</p>
                  <ul className={styles.techList}>
                    {cat.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              </AnimatedCard>
            ))}
          </AnimatedGrid>
        </AnimatedSection>

        {/* PROYECTOS REALES */}
        <AnimatedSection className={styles.section} id="demos">
          <SectionHeading
            counter="04"
            eyebrow="Lo que construirás"
            title="Proyectos reales que builds durante la carrera."
            description="En ISC TESCHA desarrollas software, sistemas de datos, APIs y aplicaciones con tecnologías del mercado. Estos son ejemplos del tipo de proyectos que forman tu portafolio profesional."
          />
          <div className={demoStyles.demoGrid}>

            <AnimatedCard>
              <article className={demoStyles.demoCard}>
                <span className={`${demoStyles.demoBadge} ${demoStyles.demoBadge_blue}`}>Web & Fullstack</span>
                <p className={demoStyles.demoTitle}>Sistema de inventario con React y Node.js</p>
                <div className={demoStyles.demoCanvas}>
                  <NeuralNetCanvas />
                </div>
                <p className={demoStyles.demoDesc}>Aplicación web fullstack para gestión de productos, usuarios y reportes. Frontend en React, API REST en Node.js y base de datos MySQL.</p>
                <a className={demoStyles.demoAction} href="#tecnologias">
                  Ver área de formación &#x2197;
                </a>
              </article>
            </AnimatedCard>

            <AnimatedCard>
              <article className={demoStyles.demoCard}>
                <span className={`${demoStyles.demoBadge} ${demoStyles.demoBadge_green}`}>Backend & Seguridad</span>
                <p className={demoStyles.demoTitle}>API REST con autenticación JWT en Node.js</p>
                <div className={demoStyles.demoCanvas}>
                  <MatrixRainCanvas />
                </div>
                <p className={demoStyles.demoDesc}>Servicio backend con rutas protegidas, gestión de usuarios y tokens de acceso. Desplegado con Docker y documentado con Swagger.</p>
                <a className={demoStyles.demoAction} href="#tecnologias">
                  Ver área de formación &#x2197;
                </a>
              </article>
            </AnimatedCard>

            <AnimatedCard>
              <article className={demoStyles.demoCard}>
                <span className={`${demoStyles.demoBadge} ${demoStyles.demoBadge_orange}`}>Datos & Machine Learning</span>
                <p className={demoStyles.demoTitle}>Clasificador de spam con Python y scikit-learn</p>
                <div className={demoStyles.demoCanvas}>
                  <SortBarsCanvas />
                </div>
                <p className={demoStyles.demoDesc}>Modelo de machine learning entrenado con Naive Bayes para clasificación de correos. Exportado con joblib e integrado en una API Flask.</p>
                <a className={demoStyles.demoAction} href="#tecnologias">
                  Ver área de formación &#x2197;
                </a>
              </article>
            </AnimatedCard>

            <AnimatedCard>
              <article className={demoStyles.demoCard}>
                <span className={`${demoStyles.demoBadge} ${demoStyles.demoBadge_pink}`}>Redes de computadoras</span>
                <p className={demoStyles.demoTitle}>Simulador de topologías LAN/WAN con Cisco</p>
                <div className={demoStyles.demoCanvas}>
                  <NetTopoCanvas />
                </div>
                <p className={demoStyles.demoDesc}>Diseño e implementación de redes con VLANs, enrutamiento OSPF y configuración de dispositivos Cisco en Packet Tracer.</p>
                <a className={demoStyles.demoAction} href="#tecnologias">
                  Ver área de formación &#x2197;
                </a>
              </article>
            </AnimatedCard>

          </div>
        </AnimatedSection>

        {/* POR QUE ISC TESCHA */}
        <AnimatedSection className={styles.section} id="valor">
          <SectionHeading
            counter="05"
            eyebrow="Por qué ISC TESCHA"
            title="Una carrera con formación técnica real y reconocimiento nacional."
            description="Programa oficial TecNM, especialidades vigentes, residencia profesional y un perfil de egreso orientado al mercado laboral tecnológico regional y nacional."
          />
          <AnimatedGrid className={styles.differentiatorGrid} stagger={0.08}>
            {differentiators.map((item) => (
              <AnimatedCard key={item.title}>
                <article className={styles.differentiatorCard}>
                  <span className={styles.diffNumber}>{item.index}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              </AnimatedCard>
            ))}
          </AnimatedGrid>
        </AnimatedSection>

        {/* PERFIL DE EGRESO */}
        <AnimatedSection className={styles.section} id="arquitectura">
          <SectionHeading
            counter="06"
            eyebrow="Perfil de egreso"
            title="Lo que sabe hacer un ingeniero que egresa de ISC TESCHA."
            description="El perfil oficial del TecNM define capacidades concretas en software, datos, redes y administración tecnológica. Competencias formadas durante nueve semestres de práctica y teoría."
          />
          <AnimatedGrid className={styles.profileGrid} stagger={0.05}>
            {graduateProfile.map((item) => (
              <AnimatedCard key={item}>
                <article className={styles.profileCard}>
                  <span className={styles.profileCheck} aria-hidden="true">&#10003;</span>
                  <p>{item}</p>
                </article>
              </AnimatedCard>
            ))}
          </AnimatedGrid>
          <AnimatedGrid className={styles.trackGrid} stagger={0.12}>
            {learningTracks.map((track) => (
              <AnimatedCard key={track.title}>
                <article className={styles.trackCard}>
                  <div className={styles.trackHeader}>
                    <span>{track.tag}</span>
                    <h3>{track.title}</h3>
                  </div>
                  <p>{track.description}</p>
                  <ul>
                    {track.capabilities.map((capability) => (
                      <li key={capability}>{capability}</li>
                    ))}
                  </ul>
                </article>
              </AnimatedCard>
            ))}
          </AnimatedGrid>
        </AnimatedSection>

        {/* ROADMAP */}
        <AnimatedSection className={styles.section} id="ruta">
          <SectionHeading
            counter="07"
            eyebrow="Trayectoria académica"
            title="De los fundamentos al despliegue profesional."
            description="Cuatro etapas que llevan al estudiante de las bases matemáticas y computacionales hasta la especialización, el proyecto integrador y la residencia profesional."
          />
          <AnimatedGrid className={styles.timeline} stagger={0.12}>
            {roadmapPhases.map((phase, i) => (
              <AnimatedCard key={phase.phase}>
                <article className={styles.timelineCard}>
                  <div className={styles.timelineNumber}>{i + 1}</div>
                  <p className={styles.timelinePhase}>{phase.phase}</p>
                  <h3>{phase.title}</h3>
                  <p>{phase.description}</p>
                  <div className={styles.timelineTags}>
                    {phase.focus.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </article>
              </AnimatedCard>
            ))}
          </AnimatedGrid>
        </AnimatedSection>

        {/* AREAS DE FORMACION */}
        <AnimatedSection className={styles.section} id="ecosistema">
          <SectionHeading
            counter="08"
            eyebrow="Áreas de formación"
            title="Las tres grandes áreas en las que te forma ISC TESCHA."
            description="Software, datos e infraestructura: los tres ejes técnicos del programa, con experiencias formativas que conectan el aula con la industria real."
          />
          <AnimatedGrid className={styles.pillarGrid} stagger={0.1}>
            {innovationPillars.map((pillar) => (
              <AnimatedCard key={pillar.title}>
                <article className={styles.pillarCard}>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.description}</p>
                </article>
              </AnimatedCard>
            ))}
          </AnimatedGrid>
          <AnimatedGrid className={styles.experienceGrid} stagger={0.1}>
            {experienceBlocks.map((block) => (
              <AnimatedCard key={block.title}>
                <article className={styles.experienceCard}>
                  <p className={styles.experienceLabel}>{block.label}</p>
                  <h3>{block.title}</h3>
                  <p>{block.description}</p>
                </article>
              </AnimatedCard>
            ))}
          </AnimatedGrid>
        </AnimatedSection>

        {/* ADMISION */}
        <AnimatedSection className={styles.section} id="proyectos">
          <SectionHeading
            counter="09"
            eyebrow="Admisión"
            title="Cómo entrar a Ingeniería en Sistemas en el TESCHA"
            description="El proceso de admisión sigue tres pasos sencillos: explorar el programa, consultar la convocatoria oficial y ponerte en contacto directo con el TESCHA."
          />
          <AnimatedGrid className={styles.opsGrid} stagger={0.1}>
            {[
              {
                step: "01",
                title: "Conoce el programa",
                body: "Revisa el plan de estudios, las especialidades disponibles y el perfil de egreso para confirmar que ISC TESCHA es tu carrera.",
              },
              {
                step: "02",
                title: "Consulta la convocatoria",
                body: "Entra al portal institucional del TESCHA para ver las fechas vigentes, requisitos de ingreso y proceso de registro oficial.",
              },
              {
                step: "03",
                title: "Contáctate con el TESCHA",
                body: "Usa los teléfonos, correo o redes oficiales para resolver dudas antes de iniciar tu trámite de ingreso.",
              },
            ].map((s) => (
              <AnimatedCard key={s.step}>
                <article className={styles.opsCard}>
                  <span className={styles.opsLabel}>Paso {s.step}</span>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </article>
              </AnimatedCard>
            ))}
          </AnimatedGrid>

          <AnimatedSection delay={0.2}>
            <div className={styles.ctaBanner} id="contacto">
              <div>
                <p className={styles.ctaLabel}>Siguiente paso</p>
                <h2>{siteCopy.cta.title}</h2>
                <p>{siteCopy.cta.description}</p>
              </div>
              <div className={styles.ctaActions}>
                <a className={styles.primaryAction} href={admissionsUrl} target="_blank" rel="noreferrer">
                  Ir a admisiones
                </a>
                <a className={styles.secondaryAction} href={officialProgramUrl} target="_blank" rel="noreferrer">
                  Ver programa oficial
                </a>
                <a className={styles.mailAction} href={`mailto:${contactEmail}`}>
                  {contactEmail}
                </a>
              </div>
            </div>
          </AnimatedSection>

          <div className={styles.contactLayout}>

            {/* ISC Division contact */}
            <AnimatedCard>
              <article className={`${styles.contactCard} ${styles.contactCardAccent}`}>
                <p className={styles.opsLabel}>Jefatura de Division ISC</p>
                <h3>{divisionContact.title}</h3>
                <p className={styles.contactHead}>{divisionContact.head}</p>
                <p className={styles.contactHours}>
                  <span className={styles.contactIcon}>&#9716;</span>
                  {divisionContact.hours}
                </p>
                <ul className={styles.contactList}>
                  {divisionContact.phones.map((phone) => (
                    <li key={phone}>
                      <span className={styles.contactIcon}>&#9990;</span>
                      <a href={`tel:${phone.replace(/\D/g, "")}`}>{phone}</a>
                    </li>
                  ))}
                  <li>
                    <span className={styles.contactIcon}>&#9990;</span>
                    <span>Extensión: <strong>{divisionContact.extension}</strong></span>
                  </li>
                  <li>
                    <span className={styles.contactIcon}>&#9993;</span>
                    <a href={`mailto:${divisionContact.email}`}>{divisionContact.email}</a>
                  </li>
                  <li>
                    <span className={styles.contactIcon}>&#x25B6;</span>
                    <a href={divisionContact.facebook} target="_blank" rel="noreferrer">
                      facebook.com/sistematescha
                    </a>
                  </li>
                </ul>
              </article>
            </AnimatedCard>

            {/* General school contact */}
            <AnimatedCard>
              <article className={styles.contactCard}>
                <p className={styles.opsLabel}>Contacto institucional</p>
                <h3>{institutionalContact.campus}</h3>
                <p className={styles.contactMapAddress}>{institutionalContact.address}</p>
                <ul className={styles.contactList}>
                  {institutionalContact.phones.map((phone) => (
                    <li key={phone}>
                      <span className={styles.contactIcon}>&#9990;</span>
                      <a href={`tel:${phone.replace(/\D/g, "")}`}>{phone}</a>
                    </li>
                  ))}
                  <li>
                    <span className={styles.contactIcon}>&#9993;</span>
                    <a href={`mailto:${institutionalContact.email}`}>{institutionalContact.email}</a>
                  </li>
                  <li>
                    <span className={styles.contactIcon}>&#x25B6;</span>
                    <a href={institutionalContact.facebook} target="_blank" rel="noreferrer">
                      facebook.com/TESCHA
                    </a>
                  </li>
                </ul>
              </article>
            </AnimatedCard>

            {/* Map */}
            <AnimatedCard>
              <div className={styles.contactMapCard}>
                <p className={styles.opsLabel}>Ubicación del campus</p>
                <div className={styles.mapFrame}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.1468054554157!2d-98.8416463!3d19.2324327!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85ce1edeb90baded%3A0xcde95624c99f93f1!2sTecnol%C3%B3gico%20de%20Estudios%20Superiores%20de%20Chalco!5e0!3m2!1ses!2smx!4v1774390266801!5m2!1ses!2smx"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ubicacion del TESCHA en Google Maps"
                  />
                </div>
                <a
                  className={styles.mapLink}
                  href="https://maps.google.com/?q=Tecnológico+de+Estudios+Superiores+de+Chalco"
                  target="_blank"
                  rel="noreferrer"
                >
                  Abrir en Google Maps &#x2197;
                </a>
              </div>
            </AnimatedCard>

          </div>
        </AnimatedSection>

      </main>
    </div>
  );
}