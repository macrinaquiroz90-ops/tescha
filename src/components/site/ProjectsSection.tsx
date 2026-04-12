"use client";

import { useState } from "react";
import { AnimatedCard } from "@/components/site/AnimatedSection";
import { ProjectModal, type ProjectModalData } from "@/components/site/ProjectModal";
import {
  NeuralNetCanvas,
  MatrixRainCanvas,
  SortBarsCanvas,
  NetTopoCanvas,
} from "@/components/site/TechDemos";
import demoStyles from "@/components/site/TechDemos.module.css";

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

export function ProjectsSection() {
  const [activeProject, setActiveProject] = useState<ProjectModalData | null>(null);

  return (
    <>
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
      {activeProject && (
        <ProjectModal data={activeProject} onClose={() => setActiveProject(null)} />
      )}
    </>
  );
}
