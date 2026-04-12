"use client";

import { useState } from "react";
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
import { ProjectModal, type ProjectModalData } from "@/components/site/ProjectModal";
import { ScrollToTop } from "@/components/site/ScrollToTop";
import {
  convocatoriaNotice,
  differentiators,
  divisionContact,
  entryProfile,
  experienceBlocks,
  faqItems,
  graduateProfile,
  heroMetrics,
  homeRouteCards,
  institutionalContact,
  innovationPillars,
  laborField,
  learningTracks,
  officialProgram,
  programPhilosophy,
  programValues,
  roadmapPhases,
  siteCopy,
  testimonials,
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

const projectCards: Array<{
  badge: string;
  badgeClass: string;
  title: string;
  desc: string;
  Canvas: React.ComponentType<{ className?: string }>;
  modal: ProjectModalData;
}> = [
  {
    badge: "Web & Fullstack",
    badgeClass: demoStyles.demoBadge_blue,
    title: "Sistema de inventario con React y Node.js",
    desc: "Aplicación web fullstack para gestión de productos, usuarios y reportes. Frontend en React, API REST en Node.js y base de datos MySQL.",
    Canvas: NeuralNetCanvas,
    modal: {
      title: "Sistema de inventario con React y Node.js",
      technologies: ["React", "Node.js", "MySQL", "JWT", "CSS Grid", "REST API"],
      steps: [
        { bold: "Diseña la base de datos", detail: "defines tablas de productos, usuarios y movimientos. Modelado relacional con MySQL." },
        { bold: "Construye la API REST", detail: "Node.js + Express expone endpoints como GET /productos, POST /entrada, DELETE /producto/:id." },
        { bold: "Conecta el frontend", detail: "React consume la API con fetch o axios. El estado global se maneja con Context o Redux." },
        { bold: "Despliega y asegura", detail: "JWT protege las rutas privadas, Docker empaqueta el proyecto, Git lo versiona." },
      ],
      semesterInfo: "Semestres 3-5: Programación Web, Bases de Datos. Semestres 6-7: Arquitectura de Software, Desarrollo de Aplicaciones Web.",
    },
  },
  {
    badge: "Backend & Seguridad",
    badgeClass: demoStyles.demoBadge_green,
    title: "API REST con autenticación JWT en Node.js",
    desc: "Servicio backend con rutas protegidas, gestión de usuarios y tokens de acceso. Desplegado con Docker y documentado con Swagger.",
    Canvas: MatrixRainCanvas,
    modal: {
      title: "API REST con autenticación JWT en Node.js",
      technologies: ["Node.js", "Express", "JWT", "Docker", "Swagger", "MongoDB"],
      steps: [
        { bold: "Define los endpoints", detail: "POST /login, GET /usuarios, DELETE /usuario/:id. Cada ruta tiene un propósito y nivel de acceso." },
        { bold: "Implementa JWT", detail: "al hacer login el servidor genera un token firmado. Cada petición protegida lo verifica antes de responder." },
        { bold: "Modela los datos", detail: "MongoDB almacena usuarios con contraseñas hasheadas con bcrypt. Seguridad desde el diseño." },
        { bold: "Dockeriza y documenta", detail: "el proyecto corre en un contenedor Docker. Swagger genera la documentación automáticamente." },
      ],
      semesterInfo: "Semestres 3-5: Programación Web, Bases de Datos. Semestres 6-8: Seguridad Informática, Redes, Arquitectura de Microservicios.",
    },
  },
  {
    badge: "Datos & Machine Learning",
    badgeClass: demoStyles.demoBadge_orange,
    title: "Clasificador de spam con Python y scikit-learn",
    desc: "Modelo de machine learning entrenado con Naive Bayes para clasificación de correos. Exportado con joblib e integrado en una API Flask.",
    Canvas: SortBarsCanvas,
    modal: {
      title: "Clasificador de spam con Python y scikit-learn",
      technologies: ["Python", "scikit-learn", "Flask", "pandas", "joblib", "REST API"],
      steps: [
        { bold: "Prepara los datos", detail: "cargas un dataset de correos etiquetados como spam/no-spam con pandas. Limpias y vectorizas el texto." },
        { bold: "Entrena el modelo", detail: "Naive Bayes clasifica texto en milisegundos. scikit-learn lo hace en pocas líneas de código." },
        { bold: "Evalúa y exporta", detail: "mides precisión, recall y F1-score. Exportas el modelo con joblib para reutilizarlo." },
        { bold: "Crea la API", detail: "Flask expone un endpoint que recibe texto y responde si es spam o no. Listo para producción." },
      ],
      semesterInfo: "Semestres 2-4: Fundamentos de Programación, Matemáticas Discretas. Semestres 6-8: Inteligencia Artificial, Análisis de Datos.",
    },
  },
  {
    badge: "Redes de computadoras",
    badgeClass: demoStyles.demoBadge_pink,
    title: "Simulador de topologías LAN/WAN con Cisco",
    desc: "Diseño e implementación de redes con VLANs, enrutamiento OSPF y configuración de dispositivos Cisco en Packet Tracer.",
    Canvas: NetTopoCanvas,
    modal: {
      title: "Simulador de topologías LAN/WAN con Cisco",
      technologies: ["Cisco Packet Tracer", "VLANs", "OSPF", "TCP/IP", "Subnetting", "ACLs"],
      steps: [
        { bold: "Diseña la topología", detail: "defines cuántos routers, switches y hosts necesitas. Se dibuja antes de configurar." },
        { bold: "Configura VLANs", detail: "segmentas la red por departamentos para aislar tráfico y mejorar la seguridad." },
        { bold: "Implementa OSPF", detail: "el protocolo de enrutamiento dinámico calcula las mejores rutas entre redes automáticamente." },
        { bold: "Aplica ACLs", detail: "las listas de control de acceso filtran tráfico. Solo pasa lo que está autorizado." },
      ],
      semesterInfo: "Semestres 4-6: Redes de Computadoras, Conmutación y Enrutamiento. Semestres 7-8: Administración de Redes, Ciberseguridad.",
    },
  },
];

export default function Home() {
  const { admissionsUrl, contactEmail, officialProgramUrl } = siteRuntimeConfig;
  const [activeProject, setActiveProject] = useState<ProjectModalData | null>(null);

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
            <motion.a
              variants={fadeUp}
              href={convocatoriaNotice.href}
              target="_blank"
              rel="noreferrer"
              className={styles.convoBadge}
            >
              <span className={styles.convoBadgeDot} aria-hidden="true" />
              {convocatoriaNotice.text}
              <span aria-hidden="true">&#8594;</span>
            </motion.a>

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
              <a className={styles.primaryAction} href={admissionsUrl} target="_blank" rel="noreferrer">
                Ir a admisiones &#8594;
              </a>
              <a className={styles.secondaryAction} href="#tecnologias">
                Ver qué aprenderás
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

        {/* ASPIRANTE HOOK */}
        <AnimatedSection>
          <div className={styles.aspiranteHook}>
            <div className={styles.aspiranteLeft}>
              <p className={styles.aspiranteEyebrow}>Para quien está decidiendo su carrera</p>
              <p className={styles.aspiranteTitle}>
                No necesitas saber programar para entrar.<br />
                Necesitas querer construir cosas.
              </p>
              <p className={styles.aspiranteDesc}>
                Si te gustan los videojuegos, las apps, las redes o simplemente "cómo funciona todo eso", ya tienes el perfil. ISC TESCHA empieza desde cero: lógica, algoritmos y código desde el primer semestre.
              </p>
            </div>
            <ul className={styles.aspiranteList}>
              <li>Empiezas desde lógica y algoritmos</li>
              <li>No se requiere experiencia previa</li>
              <li>Aprenderás a programar en la carrera</li>
              <li>El plan te guía paso a paso, semestre a semestre</li>
            </ul>
          </div>
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

        {/* FILOSOFÍA DEL PROGRAMA */}
        <AnimatedSection className={styles.section}>
          <SectionHeading
            counter="03"
            eyebrow="Filosofía del programa"
            title="Visión, misión y valores que guían la formación en ISC TESCHA."
            description="El programa basa su formación en una visión clara de liderazgo ético, misión de servicio social y seis valores institucionales del TecNM."
          />
          <AnimatedGrid className={styles.programGrid} stagger={0.1}>
            <AnimatedCard>
              <article className={styles.statementCard}>
                <p className={styles.cardIndex}>Visión</p>
                <h3>Formación con visión estratégica y sentido ético</h3>
                <p>{programPhilosophy.vision}</p>
              </article>
            </AnimatedCard>
            <AnimatedCard>
              <article className={styles.statementCard}>
                <p className={styles.cardIndex}>Misión del programa</p>
                <h3>Soluciones de calidad con responsabilidad social</h3>
                <p>{programPhilosophy.misionPrograma}</p>
              </article>
            </AnimatedCard>
          </AnimatedGrid>
          <AnimatedGrid className={styles.valueGrid} stagger={0.08}>
            {programValues.map((val) => (
              <AnimatedCard key={val.title}>
                <article className={styles.valueCard}>
                  <h3>{val.title}</h3>
                  <p>{val.description}</p>
                </article>
              </AnimatedCard>
            ))}
          </AnimatedGrid>
        </AnimatedSection>

        {/* QUE VAS A APRENDER */}
        <AnimatedSection className={styles.section} id="tecnologias">
          <SectionHeading
            counter="04"
            eyebrow="Qué aprenderás"
            title="Seis áreas tecnológicas con aplicación directa en la industria."
            description="El programa cubre desde programación y bases de datos hasta redes, industria 4.0, inteligencia artificial y comercio electrónico. Esto es lo que construirás a lo largo de la carrera."
          />
          <div className={styles.mHook}>
            <span className={styles.mHookEmoji}>&#x1F680;</span>
            <div className={styles.mHookBody}>
              <p className={styles.mHookTitle}>La carrera donde el día 1 ya estás haciendo algo</p>
              <p className={styles.mHookDesc}>Desde el primer semestre: algoritmos, lógica, código. Sin rodeos, sin relleno.</p>
            </div>
          </div>
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
            counter="05"
            eyebrow="Lo que construirás"
            title="Proyectos reales que construyes durante la carrera."
            description="En ISC TESCHA desarrollas software, sistemas de datos, APIs y aplicaciones con tecnologías del mercado. Estos son ejemplos del tipo de proyectos que forman tu portafolio profesional."
          />
          <div className={styles.mHook}>
            <span className={styles.mHookEmoji} aria-hidden="true">&#x23F1;</span>
            <div className={styles.mHookBody}>
              <p className={styles.mHookTitle}>¿Cuándo se hacen estos proyectos?</p>
              <p className={styles.mHookDesc}>
                Estos proyectos los alcanzas en los semestres 5 al 8, cuando ya tienes las bases. Los primeros semestres construyes lo fundamental: lógica, algoritmos, matemáticas y programación. Todo avanza paso a paso, semestre a semestre.
              </p>
            </div>
          </div>
          <div className={demoStyles.demoGrid}>
            {projectCards.map((card) => {
              const { Canvas } = card;
              return (
                <AnimatedCard key={card.title}>
                  <article
                    className={demoStyles.demoCard}
                    onClick={() => setActiveProject(card.modal)}
                    onKeyDown={(e) => e.key === "Enter" && setActiveProject(card.modal)}
                    role="button"
                    tabIndex={0}
                  >
                    <span className={`${demoStyles.demoBadge} ${card.badgeClass}`}>{card.badge}</span>
                    <p className={demoStyles.demoTitle}>{card.title}</p>
                    <div className={demoStyles.demoCanvas}>
                      <Canvas />
                    </div>
                    <p className={demoStyles.demoDesc}>{card.desc}</p>
                    <span className={demoStyles.demoClickHint}>
                      <span className={demoStyles.demoClickDot} aria-hidden="true" />
                      Haz clic para ver cómo se construyó
                    </span>
                  </article>
                </AnimatedCard>
              );
            })}
          </div>
        </AnimatedSection>

        {/* POR QUE ISC TESCHA */}
        <AnimatedSection className={styles.section} id="valor">
          <SectionHeading
            counter="06"
            eyebrow="Por qué ISC TESCHA"
            title="Una carrera con formación técnica real y reconocimiento nacional."
            description="Programa oficial TecNM, especialidades vigentes, residencia profesional y un perfil de egreso orientado al mercado laboral tecnológico regional y nacional."
          />
          <div className={styles.mHook}>
            <span className={styles.mHookEmoji}>&#x26A1;</span>
            <div className={styles.mHookBody}>
              <p className={styles.mHookTitle}>No solo aprendes a programar</p>
              <p className={styles.mHookDesc}>Aprendes a construir cosas que funcionan. Sistemas reales, datos reales, redes reales.</p>
            </div>
          </div>
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
            counter="07"
            eyebrow="Perfil de egreso"
            title="Lo que sabe hacer un ingeniero que egresa de ISC TESCHA."
            description="El perfil oficial del TecNM define capacidades concretas en software, datos, redes y administración tecnológica. Competencias formadas durante nueve semestres de práctica y teoría."
          />
          <div className={styles.mHook}>
            <span className={styles.mHookEmoji}>&#x1F9E0;</span>
            <div className={styles.mHookBody}>
              <p className={styles.mHookTitle}>Egresa con portafolio, no solo título</p>
              <p className={styles.mHookDesc}>Proyectos reales, residencia en empresa y nueve semestres que se traducen en trabajo.</p>
            </div>
          </div>
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
            counter="08"
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
            counter="09"
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

        {/* CAMPO LABORAL */}
        <AnimatedSection className={styles.section}>
          <SectionHeading
            counter="10"
            eyebrow="Campo laboral"
            title="Dónde trabaja un egresado de ISC TESCHA."
            description="La carrera abre puertas en sectores de software, datos, redes, consultoría y emprendimiento tecnológico."
          />
          <AnimatedCard>
            <div className={styles.laborCard}>
              <p>{laborField.description}</p>
              <ul className={styles.laborChips}>
                {laborField.areas.map((area) => (
                  <li className={styles.laborChip} key={area}>{area}</li>
                ))}
              </ul>
            </div>
          </AnimatedCard>
        </AnimatedSection>

        {/* TESTIMONIOS */}
        <AnimatedSection className={styles.section} id="testimonios">
          <SectionHeading
            counter="12"
            eyebrow="Testimonios"
            title="Lo que dicen egresados y empresas sobre ISC TESCHA."
            description="Opiniones de quienes pasaron por la carrera y de empleadores que han contratado egresados del programa."
          />
          <AnimatedGrid className={styles.testimonialGrid} stagger={0.1}>
            {testimonials.map((t) => (
              <AnimatedCard key={t.name}>
                <article className={styles.testimonialCard}>
                  <p className={styles.testimonialQuote}>{t.quote}</p>
                  <div className={styles.testimonialMeta}>
                    <span className={styles.testimonialName}>{t.name}</span>
                    <span className={styles.testimonialRole}>{t.role}</span>
                    <span className={styles.testimonialOrg}>{t.org}</span>
                  </div>
                </article>
              </AnimatedCard>
            ))}
          </AnimatedGrid>
        </AnimatedSection>

        {/* PREGUNTAS FRECUENTES */}
        <AnimatedSection className={styles.section} id="faq">
          <SectionHeading
            counter="13"
            eyebrow="Preguntas frecuentes"
            title="Resolvemos las dudas más comunes sobre la carrera."
            description="Si tienes más preguntas, contacta directamente con la jefatura de división ISC o el departamento de admisiones del TESCHA."
          />
          <div className={styles.faqList}>
            {faqItems.map((item) => (
              <AnimatedCard key={item.q}>
                <details className={styles.faqItem}>
                  <summary className={styles.faqSummary}>
                    <span>{item.q}</span>
                    <span className={styles.faqIcon} aria-hidden="true">+</span>
                  </summary>
                  <p className={styles.faqAnswer}>{item.a}</p>
                </details>
              </AnimatedCard>
            ))}
          </div>
        </AnimatedSection>

        {/* ADMISION */}
        <AnimatedSection className={styles.section} id="proyectos">
          <SectionHeading
            counter="14"
            eyebrow="Admisión"
            title="Cómo entrar a Ingeniería en Sistemas en el TESCHA"
            description="El proceso de admisión sigue tres pasos sencillos: explorar el programa, consultar la convocatoria oficial y ponerte en contacto directo con el TESCHA."
          />
          <div className={styles.mHook}>
            <span className={styles.mHookEmoji}>&#x1F4BB;</span>
            <div className={styles.mHookBody}>
              <p className={styles.mHookTitle}>Si puedes imaginarlo, en ISC puedes construirlo</p>
              <p className={styles.mHookDesc}>Apps, APIs, redes, IA, automatización. Elige tu área, domina las herramientas.</p>
            </div>
          </div>
          <div className={styles.entrySection}>
            <p className={styles.entryLabel}>Perfil de ingreso — habilidades deseables en el aspirante</p>
            <ul className={styles.entryChips}>
              {entryProfile.map((skill) => (
                <li className={styles.entryChip} key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
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
      {activeProject && (
        <ProjectModal data={activeProject} onClose={() => setActiveProject(null)} />
      )}
      <ScrollToTop />
    </div>
  );
}