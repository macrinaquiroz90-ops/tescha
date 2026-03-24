export const sections = [
  { id: "programa", label: "Programa" },
  { id: "valor", label: "Valor" },
  { id: "arquitectura", label: "Arquitectura" },
  { id: "ruta", label: "Ruta" },
  { id: "ecosistema", label: "Ecosistema" },
  { id: "proyectos", label: "Operación" },
] as const;

export const primaryNavigation = [
  { href: "/", label: "Inicio" },
  { href: "/plan-estudios", label: "Plan" },
  { href: "/especialidades", label: "Especialidades" },
  { href: "/contacto", label: "Contacto" },
] as const;

export const siteCopy = {
  hero: {
    lead: "Tecnológico de Estudios Superiores de Chalco · TecNM",
    title: "Ingeniería en Sistemas Computacionales.",
    description:
      "Forma ingenieros capaces de diseñar, desarrollar e implementar tecnología digital con impacto real. Nueve semestres, plan oficial TecNM, dos especialidades activas y salida directa al mercado tecnológico.",
    caption:
      "Carrera pública, con respaldo nacional, en el oriente del Estado de México. Orientada al perfil profesional que más demanda el sector TI en la región y el país.",
    highlights: [
      "Plan oficial TecNM",
      "2 especialidades activas",
      "Residencia profesional incluida",
    ],
  },
  signal: {
    title: "No sólo programas: construirás soluciones que funcionan en el mundo real.",
    description:
      "ISC TESCHA combina fundamentos sólidos de ingeniería con especialidades alineadas a la industria. Saldrás con criterio técnico en software, datos, infraestructura y sistemas para la industria 4.0.",
  },
  cta: {
    title: "¿Listo para ingresar a Ingeniería en Sistemas en el TESCHA?",
    description:
      "Consulta el proceso de admisión oficial, las fechas de convocatoria vigentes y los requisitos de ingreso en el portal institucional del TESCHA.",
  },
} as const;

export const homeRouteCards = [
  {
    href: "/plan-estudios",
    label: "Plan de estudios",
    title: "Ruta formativa con lectura clara del mapa académico",
    description:
      "Presenta créditos, ciclos y materias clave de forma entendible para aspirantes y familias.",
  },
  {
    href: "/especialidades",
    label: "Especialidades",
    title: "Áreas de enfoque con lenguaje más actual y tecnológico",
    description:
      "Industria 4.0, ciencia de datos, comercio electrónico y desarrollo web/mobile expuestos con mejor narrativa.",
  },
  {
    href: "/contacto",
    label: "Contacto",
    title: "Canales oficiales, ubicación y siguiente paso para aspirantes",
    description:
      "Todo el cierre institucional en una sola pantalla, sin perder la estética del sitio.",
  },
] as const;

export const officialProgram = {
  welcome:
    "La academia recibe a las y los estudiantes con una visión de disciplina, formación técnica y crecimiento profesional. La idea no es solo cursar materias, sino construir criterio para resolver problemas reales.",
  objective:
    "Formar profesionistas con visión estratégica, sentido ético y capacidad para diseñar, desarrollar, implementar y administrar tecnología computacional orientada a soluciones innovadoras con impacto social.",
  specialties: [
    {
      title: "Desarrollo de sistemas para la industria 4.0",
      description:
        "Ruta enfocada a automatización, transformación digital, programación web, análisis de datos, sistemas programables y herramientas que conectan software con operación industrial.",
    },
    {
      title: "Comercio electrónico",
      description:
        "Especialidad orientada a plataformas digitales de negocio, aplicaciones para comercio electrónico, infraestructura tecnológica y operación de entornos de venta en línea.",
    },
  ],
} as const;

export const officialResources = [
  {
    title: "Programa oficial ISC TESCHA",
    description:
      "Página institucional con bienvenida, documentos del área y datos generales del programa.",
    href: "https://tescha.edomex.gob.mx/ing-sistemas-computacionales",
  },
  {
    title: "Plan de estudio para aspirantes",
    description:
      "Sección oficial con especialidades visibles en el plan y enlaces de apoyo para aspirantes.",
    href: "https://tescha.edomex.gob.mx/plan-estudio-aspirantes",
  },
  {
    title: "Objetivo y perfil de egreso",
    description:
      "PDF oficial del TecNM con el objetivo general y las capacidades de egreso de ISC.",
    href: "https://tescha.edomex.gob.mx/sites/tescha.edomex.gob.mx/files/files/Sistemas%20Computacionales/Objetivo%20y%20perfil%20de%20Egreso.pdf",
  },
  {
    title: "Retícula industria 4.0",
    description:
      "Documento con la estructura académica, distribución por periodos y total de créditos.",
    href: "https://tescha.edomex.gob.mx/sites/tescha.edomex.gob.mx/files/files/Sistemas%20Computacionales/Reticula%20Especialidad%20Desarrollo%20de%20Sistemas%20para%20la%20Industria%204_0.pdf",
  },
] as const;

export const studyPlanSummary = [
  {
    value: "9",
    label: "Semestres",
    description:
      "La retícula oficial visible del programa se distribuye en nueve periodos.",
  },
  {
    value: "210",
    label: "Créditos",
    description:
      "Carga total señalada en la retícula oficial consultada del TecNM para ISC.",
  },
  {
    value: "4",
    label: "Bloques",
    description:
      "La interpretación del sitio agrupa la ruta en fundamentos, construcción, plataforma y especialidad.",
  },
] as const;

export const studyPlanStages = [
  {
    phase: "Bloque 01",
    title: "Fundamentos matemáticos y computacionales",
    description:
      "La base se apoya en lógica, matemáticas, investigación y programación inicial para formar criterio técnico.",
    subjects: [
      "Cálculo Diferencial",
      "Fundamentos de Programación",
      "Matemáticas Discretas",
      "Programación Orientada a Objetos",
      "Estructura de Datos",
    ],
  },
  {
    phase: "Bloque 02",
    title: "Software, datos y modelado",
    description:
      "La ruta entra a software con enfoque estructurado: bases de datos, ingeniería de software, simulación y análisis.",
    subjects: [
      "Fundamentos de Bases de Datos",
      "Taller de Base de Datos",
      "Fundamentos de Ingeniería de Software",
      "Administración de Base de Datos",
      "Simulación",
    ],
  },
  {
    phase: "Bloque 03",
    title: "Infraestructura, sistemas y conectividad",
    description:
      "El perfil crece hacia redes, sistemas operativos, telecomunicaciones y administración tecnológica.",
    subjects: [
      "Sistemas Operativos",
      "Taller de Sistemas Operativos",
      "Redes de Computadoras",
      "Conmutación y Enrutamiento en Redes de Datos",
      "Administración de Redes",
    ],
  },
  {
    phase: "Bloque 04",
    title: "Especialidad, integración y despliegue",
    description:
      "El cierre del trayecto incorpora materias de web, análisis de datos, IA, especialidad, residencia y servicio social.",
    subjects: [
      "Programación Web",
      "Gestión de Bases de Datos SQL y NoSQL",
      "Inteligencia Artificial",
      "Programación de Aplicaciones para Dispositivos Móviles",
      "Residencia Profesional",
    ],
  },
] as const;

export const specializationShowcase = [
  {
    family: "Plan para aspirantes",
    title: "Desarrollo de Aplicaciones para Web y Dispositivos Móviles",
    description:
      "Ruta visible en la sección oficial de plan de estudio. Ideal para presentar frontend, backend, UX y despliegue móvil con un lenguaje contemporáneo.",
    modules: [
      "Aplicaciones web",
      "Interfaces responsivas",
      "Consumo de servicios",
      "Despliegue móvil",
    ],
  },
  {
    family: "Plan para aspirantes",
    title: "Ciencia de Datos y Aplicaciones Inteligentes",
    description:
      "Especialidad publicada en la sección de plan de estudios orientada a analítica, modelos y uso aplicado de datos.",
    modules: [
      "Análisis de datos",
      "Modelos inteligentes",
      "Visualización",
      "Automatización basada en datos",
    ],
  },
  {
    family: "Programa oficial",
    title: "Desarrollo de Sistemas para la Industria 4.0",
    description:
      "Especialidad señalada en la página del programa y en la retícula consultada, ligada a transformación digital, sistemas programables y web para industria.",
    modules: [
      "Transformación digital",
      "Sistemas programables",
      "Tecnologías web para industria",
      "Taller de análisis de datos",
    ],
  },
  {
    family: "Programa oficial",
    title: "Comercio Electrónico",
    description:
      "La fuente oficial del programa también muestra una línea ligada a negocios electrónicos, aplicaciones y operación digital.",
    modules: [
      "Aplicaciones para e-commerce",
      "Infraestructura digital",
      "Negocios electrónicos",
      "Operación de plataformas",
    ],
  },
] as const;

export const aspirantPath = [
  {
    step: "01",
    title: "Explora el programa",
    description:
      "Revisa la oferta de ISC, su objetivo, retícula y especialidades para entender la orientación del programa.",
  },
  {
    step: "02",
    title: "Consulta admisión",
    description:
      "Da el salto al canal institucional para convocatorias, trámites, fechas y proceso formal de ingreso.",
  },
  {
    step: "03",
    title: "Contacta al TESCHA",
    description:
      "Usa los teléfonos, correo y redes oficiales para resolver dudas antes de iniciar el proceso.",
  },
] as const;

export const heroMetrics = [
  {
    value: "9",
    label: "Semestres",
    description:
      "Plan de estudio estructurado en nueve periodos semestrales con carga progresiva y especialización al final.",
  },
  {
    value: "210",
    label: "Créditos",
    description:
      "Total de créditos al egreso según la retícula oficial del plan TecNM para ISC.",
  },
  {
    value: "2",
    label: "Especialidades",
    description:
      "Industria 4.0 y Comercio Electrónico, con rutas en desarrollo web, móvil y ciencia de datos.",
  },
  {
    value: "TecNM",
    label: "Reconocimiento nacional",
    description:
      "Plan avalado por el Tecnológico Nacional de México con validez académica en todo el país.",
  },
] as const;

export const differentiators = [
  {
    index: "01",
    title: "Formación técnica integral",
    description:
      "Programación, bases de datos, redes, inteligencia artificial y sistemas operativos: el conjunto completo para construir y gestionar soluciones tecnológicas reales.",
  },
  {
    index: "02",
    title: "Especialidades vigentes",
    description:
      "Industria 4.0 y Comercio Electrónico como rutas formales, más orientaciones en web, móvil y ciencia de datos alineadas al mercado actual.",
  },
  {
    index: "03",
    title: "Plan avalado por TecNM",
    description:
      "Currícula del Tecnológico Nacional de México con reconocimiento nacional, equivalencia entre sedes y presencia en convocatorias del sector público y privado.",
  },
  {
    index: "04",
    title: "Residencia profesional",
    description:
      "El egreso incluye residencia en empresa o institución real: proyecto técnico aplicado, supervisión dual y primer contacto formal con el entorno laboral.",
  },
] as const;

export const learningTracks = [
  {
    tag: "Build",
    title: "Software y experiencia digital",
    description:
      "Diseño de interfaces, servicios, APIs y aplicaciones que responden a necesidades reales con criterio de producto.",
    capabilities: [
      "Desarrollo web y móvil",
      "Arquitecturas frontend y backend",
      "Diseño de APIs y servicios",
      "Experiencia de usuario con enfoque funcional",
    ],
  },
  {
    tag: "Data",
    title: "Datos, IA y automatización",
    description:
      "Modelado de información, analítica y automatización de procesos para convertir datos en decisiones y eficiencia operativa.",
    capabilities: [
      "Bases de datos relacionales y no relacionales",
      "Analítica aplicada y tableros",
      "Automatización de flujos",
      "Introducción a IA y sistemas inteligentes",
    ],
  },
  {
    tag: "Scale",
    title: "Infraestructura, seguridad y despliegue",
    description:
      "Sistemas confiables para operar productos digitales con observabilidad, control y visión de continuidad.",
    capabilities: [
      "Cloud y virtualización",
      "Fundamentos de ciberseguridad",
      "Prácticas de entrega y despliegue",
      "Monitoreo y gobierno técnico",
    ],
  },
] as const;

export const roadmapPhases = [
  {
    phase: "Fase 01",
    title: "Fundamentos que sí sostienen sistemas",
    description:
      "Pensamiento computacional, programación, lógica, matemáticas discretas y la disciplina técnica necesaria para no improvisar.",
    focus: ["Algoritmos", "Lógica", "Modelado", "Bases sólidas"],
  },
  {
    phase: "Fase 02",
    title: "Construcción de software y datos",
    description:
      "Aplicaciones, servicios, diseño de bases de datos, redes y estructuras que convierten teoría en sistemas utilizables.",
    focus: ["APIs", "Datos", "Interfaces", "Integración"],
  },
  {
    phase: "Fase 03",
    title: "Especialización y criterio de arquitectura",
    description:
      "El estudiante entiende cómo elegir herramientas, organizar módulos, proteger información y optimizar flujos.",
    focus: ["Cloud", "Seguridad", "Arquitectura", "Escalabilidad"],
  },
  {
    phase: "Fase 04",
    title: "Proyecto, residencia y despliegue profesional",
    description:
      "La formación se aterriza en propuestas ejecutables con contacto real con operación, empresa y entrega final.",
    focus: ["Producto", "QA", "Entrega", "Portafolio"],
  },
] as const;

export const innovationPillars = [
  {
    title: "Desarrollo de software",
    description:
      "Programación orientada a objetos, aplicaciones web, móvil y multiplataforma con foco en arquitectura, calidad de código y despliegue profesional.",
  },
  {
    title: "Datos e inteligencia artificial",
    description:
      "Bases de datos relacionales y NoSQL, analítica aplicada, modelos inteligentes y automatización para soporte de decisiones en entornos de negocio.",
  },
  {
    title: "Redes e infraestructura",
    description:
      "Diseño, configuración y administración de redes bajo estándares vigentes, seguridad informática y gestión de sistemas operativos en producción.",
  },
] as const;

export const experienceBlocks = [
  {
    label: "Residencia",
    title: "Proyecto real en empresa o institución",
    description:
      "Último semestre en entorno laboral real. Se desarrolla un proyecto técnico con impacto directo en la organización receptora y supervisión académica-empresarial.",
  },
  {
    label: "Vinculación",
    title: "Sector tecnológico regional activo",
    description:
      "TESCHA mantiene vínculos con el sector productivo del oriente del Estado de México para prácticas, proyectos colaborativos y primeras oportunidades laborales.",
  },
  {
    label: "Servicio Social",
    title: "Aporte comunitario con enfoque técnico",
    description:
      "El servicio social permite aplicar competencias en instituciones, comunidades o proyectos de impacto social con respaldo y supervisión institucional.",
  },
] as const;

export const graduateProfile = [
  "Construye aplicaciones para distintos contextos integrando tecnologías, plataformas y dispositivos.",
  "Modela y resuelve problemas computacionales con apoyo de herramientas matemáticas y pensamiento analítico.",
  "Diseña interfaces y soluciones para automatización, hardware y software asociado.",
  "Participa y coordina equipos multidisciplinarios para implementar soluciones innovadoras.",
  "Administra bases de datos con criterios de rendimiento, seguridad y cumplimiento.",
  "Desarrolla software alineado a productividad, competitividad y estándares de calidad.",
  "Evalúa tecnologías de hardware para soportar aplicaciones de forma efectiva.",
  "Detecta oportunidades y plantea proyectos con visión empresarial apoyados en TIC.",
  "Diseña, configura y administra redes bajo normas y estándares vigentes.",
] as const;

export const institutionalContact = {
  campus: "Tecnológico de Estudios Superiores de Chalco",
  address:
    "Carretera Federal México Cuautla s/n, La Candelaria Tlapala, Chalco, Edo. de México",
  phones: ["(0155) 5982 0848", "(0155) 5982 1088"],
  email: "dir.general@tesch.edu.mx",
  facebook: "https://www.facebook.com/TESCHA",
  programUrl: "https://tescha.edomex.gob.mx/ing-sistemas-computacionales",
} as const;

export const divisionContact = {
  title: "Jefatura de División de ISC",
  head: "Dra. en C.C. Fabiola Orquídea Sánchez Hernández",
  hours: "09:00 a 15:00 h · 16:00 a 18:00 h",
  phones: ["5982 0848", "5982 1089"],
  extension: "1121",
  email: "jefatura.sistemas@tesch.edu.mx",
  facebook: "https://www.facebook.com/sistematescha/",
  website: "https://sictescha.000webhostapp.com/index.html",
  websiteNote: "En mantenimiento",
} as const;
