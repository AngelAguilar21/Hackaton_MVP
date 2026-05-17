export const CANDIDATES = [
  {
    id: 'u1',
    name: 'María García Reyes',
    career: 'Ingeniería de Sistemas — UPC',
    year: 'Egresada 2024',
    avatar: null,
    initials: 'MG',
    avatarColor: 'bg-violet-500',
    score: 847,
    location: 'Lima, Perú',
    bio: 'Apasionada por el análisis de datos y la inteligencia artificial. Busco mi primera oportunidad para impactar con tecnología.',
    badges: [
      { id: 'b1', skill: 'Análisis de Datos', level: 'Practicante', color: 'violet', source: 'Reto empresarial — BCP', icon: '📊' },
      { id: 'b2', skill: 'Python', level: 'Practicante', color: 'sky', source: 'Portafolio verificado', icon: '🐍' },
      { id: 'b3', skill: 'Pensamiento Crítico', level: 'Explorador', color: 'emerald', source: 'Validación entre pares', icon: '🧠' },
    ],
    projects: [
      { id: 'p1', title: 'Predicción de churn en telecomunicaciones', description: 'Modelo ML con 87% de accuracy para predecir abandono de clientes en dataset de 50k registros.', tags: ['Python', 'Machine Learning', 'Pandas'], stars: 12 },
      { id: 'p2', title: 'Dashboard de análisis de ventas', description: 'Visualización interactiva de KPIs de ventas para PYME del sector retail con integración a Google Sheets.', tags: ['Power BI', 'SQL', 'Excel'], stars: 8 },
    ],
    scoreBreakdown: { ai: 40, peers: 35, portfolio: 25 },
    validationsReceived: 7,
    challengesCompleted: 3,
  },
  {
    id: 'u2',
    name: 'Carlos Ramos Vega',
    career: 'Administración de Empresas — UP',
    year: 'Egresado 2025',
    avatar: null,
    initials: 'CR',
    avatarColor: 'bg-sky-500',
    score: 723,
    location: 'Lima, Perú',
    bio: 'Enfocado en estrategia de negocios y marketing digital. Experiencia en proyectos universitarios con impacto real.',
    badges: [
      { id: 'b4', skill: 'Estrategia de Negocio', level: 'Practicante', color: 'amber', source: 'Reto empresarial — Rappi', icon: '🚀' },
      { id: 'b5', skill: 'Marketing Digital', level: 'Explorador', color: 'pink', source: 'Validación entre pares', icon: '📣' },
    ],
    projects: [
      { id: 'p3', title: 'Plan de expansión para startup EdTech', description: 'Análisis de mercado y plan go-to-market para plataforma de educación online en 3 países latinoamericanos.', tags: ['Estrategia', 'Investigación de Mercado'], stars: 6 },
    ],
    scoreBreakdown: { ai: 35, peers: 40, portfolio: 25 },
    validationsReceived: 5,
    challengesCompleted: 2,
  },
  {
    id: 'u3',
    name: 'Ana López Huanca',
    career: 'Diseño de Experiencia de Usuario — UTEC',
    year: 'Último ciclo',
    avatar: null,
    initials: 'AL',
    avatarColor: 'bg-pink-500',
    score: 891,
    location: 'Lima, Perú',
    bio: 'Diseñadora UX apasionada por crear experiencias digitales inclusivas y accesibles para la realidad latinoamericana.',
    badges: [
      { id: 'b6', skill: 'Diseño UX', level: 'Experto', color: 'amber', source: 'Reto empresarial — Yape', icon: '🎨' },
      { id: 'b7', skill: 'Research de Usuarios', level: 'Practicante', color: 'violet', source: 'Reto empresarial', icon: '🔍' },
      { id: 'b8', skill: 'Prototipado', level: 'Practicante', color: 'sky', source: 'Portafolio verificado', icon: '✏️' },
    ],
    projects: [
      { id: 'p4', title: 'Rediseño de app de pagos para adultos mayores', description: 'Investigación con 30 usuarios mayores de 60 años + rediseño completo con mejora de 65% en tasa de éxito.', tags: ['Figma', 'User Research', 'Accesibilidad'], stars: 21 },
    ],
    scoreBreakdown: { ai: 45, peers: 30, portfolio: 25 },
    validationsReceived: 11,
    challengesCompleted: 4,
  },
  {
    id: 'u4',
    name: 'Diego Flores Quispe',
    career: 'Ingeniería Industrial — PUCP',
    year: 'Egresado 2024',
    avatar: null,
    initials: 'DF',
    avatarColor: 'bg-emerald-500',
    score: 678,
    location: 'Arequipa, Perú',
    bio: 'Especialista en optimización de procesos y gestión de proyectos. Me interesa la industria de manufactura y logística.',
    badges: [
      { id: 'b9', skill: 'Gestión de Proyectos', level: 'Practicante', color: 'emerald', source: 'Validación entre pares', icon: '📋' },
      { id: 'b10', skill: 'Análisis de Procesos', level: 'Explorador', color: 'sky', source: 'Portafolio verificado', icon: '⚙️' },
    ],
    projects: [
      { id: 'p5', title: 'Optimización de línea de producción en planta textil', description: 'Implementación de lean manufacturing que redujo tiempos de ciclo en 23% y merma en 15%.', tags: ['Lean Manufacturing', 'Six Sigma', 'AutoCAD'], stars: 9 },
    ],
    scoreBreakdown: { ai: 30, peers: 45, portfolio: 25 },
    validationsReceived: 4,
    challengesCompleted: 2,
  },
]

export const CHALLENGES = [
  {
    id: 'c1',
    title: 'Análisis de comportamiento de clientes digitales',
    company: 'BCP',
    companyColor: 'bg-orange-500',
    area: 'Datos',
    difficulty: 'Intermedio',
    difficultyColor: 'text-amber-600 bg-amber-50 border-amber-200',
    points: 120,
    deadline: '2026-05-25',
    description: `El BCP necesita entender mejor el comportamiento de sus clientes en la app móvil para reducir el abandono en el flujo de apertura de cuenta.

Contexto: Tenemos datos de 10,000 sesiones de usuarios en los últimos 30 días. El 67% de los usuarios que inician el proceso de apertura no lo completan.

Tu reto: Propón una estrategia de análisis de datos para identificar los puntos de abandono más críticos y sugiere 3 intervenciones concretas basadas en datos para mejorar la tasa de conversión.

Entrega esperada: Documento con tu enfoque analítico, las métricas clave que medirías, las hipótesis que probarías y las recomendaciones de mejora con su impacto esperado.`,
    criteria: [
      'Claridad del enfoque analítico propuesto (25%)',
      'Identificación correcta de métricas relevantes (25%)',
      'Calidad y fundamentación de las hipótesis (25%)',
      'Concreción y viabilidad de las recomendaciones (25%)',
    ],
    skillTag: 'Análisis de Datos',
    participants: 34,
  },
  {
    id: 'c2',
    title: 'Estrategia de optimización de última milla en Lima',
    company: 'Rappi',
    companyColor: 'bg-orange-400',
    area: 'Negocio',
    difficulty: 'Avanzado',
    difficultyColor: 'text-red-600 bg-red-50 border-red-200',
    points: 160,
    deadline: '2026-05-28',
    description: `Rappi enfrenta el desafío de aumentar la puntualidad de sus entregas en Lima durante las horas pico (12pm-2pm y 7pm-9pm), donde actualmente el 38% de pedidos llegan tarde.

El tráfico limeño, la densidad poblacional variable por distrito y la gestión de repartidores son las principales variables.

Tu reto: Diseña una estrategia integral de optimización de última milla que mejore la puntualidad al 85%+ manteniendo los costos operativos actuales.

Considera: zonificación de entregas, incentivos para repartidores, comunicación con clientes y uso de datos en tiempo real.`,
    criteria: [
      'Diagnóstico claro del problema (20%)',
      'Creatividad e innovación en la solución (30%)',
      'Viabilidad operativa y financiera (30%)',
      'Plan de implementación concreto (20%)',
    ],
    skillTag: 'Estrategia de Negocio',
    participants: 21,
  },
  {
    id: 'c3',
    title: 'Rediseño de experiencia de onboarding digital',
    company: 'Yape',
    companyColor: 'bg-violet-500',
    area: 'Diseño',
    difficulty: 'Intermedio',
    difficultyColor: 'text-amber-600 bg-amber-50 border-amber-200',
    points: 130,
    deadline: '2026-05-30',
    description: `Yape quiere mejorar la experiencia de onboarding para usuarios mayores de 50 años, que representan el 22% de las deserciones en el primer uso de la app.

El proceso actual tiene 7 pasos y requiere validación biométrica, lo que genera fricción para este segmento.

Tu reto: Rediseña el flujo de onboarding de Yape para hacerlo más accesible e intuitivo para personas mayores de 50 años, sin perder los requisitos de seguridad y compliance.

Entrega: Documento con el nuevo flujo propuesto, justificación de decisiones de diseño basadas en principios de UX para adultos mayores, y métricas de éxito.`,
    criteria: [
      'Comprensión del usuario objetivo (25%)',
      'Aplicación de principios de accesibilidad (30%)',
      'Innovación en la solución propuesta (25%)',
      'Definición de métricas de éxito (20%)',
    ],
    skillTag: 'Diseño UX',
    participants: 18,
  },
  {
    id: 'c4',
    title: 'Plan de entrada al mercado de Piura y Chiclayo',
    company: 'Intercorp',
    companyColor: 'bg-blue-600',
    area: 'Negocio',
    difficulty: 'Básico',
    difficultyColor: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    points: 90,
    deadline: '2026-06-01',
    description: `Intercorp está evaluando expandir una de sus marcas de retail a las ciudades de Piura y Chiclayo en los próximos 12 meses.

Actualmente opera principalmente en Lima y necesita adaptar su modelo de negocio a la realidad del norte del Perú.

Tu reto: Elabora un plan de entrada al mercado para Piura y/o Chiclayo que incluya análisis de la competencia local, propuesta de adaptación del modelo de negocio y plan de lanzamiento.

Considera el perfil del consumidor norteño, la infraestructura local y los competidores regionales.`,
    criteria: [
      'Profundidad del análisis de mercado (30%)',
      'Adecuación cultural y local de la propuesta (25%)',
      'Realismo del plan de lanzamiento (25%)',
      'Identificación de riesgos y mitigaciones (20%)',
    ],
    skillTag: 'Estrategia de Negocio',
    participants: 45,
  },
]

export const VALIDATION_QUEUE = [
  {
    id: 'v1',
    candidate: { name: 'Luis Mendoza', initials: 'LM', avatarColor: 'bg-teal-500', career: 'Ing. Industrial — UNI', score: 512 },
    project: {
      title: 'Sistema de gestión de inventario con alertas automáticas',
      description: 'Desarrollé un sistema en Excel + VBA que automatiza el control de stock de una ferretería familiar, con alertas de reposición y reportes mensuales automáticos. El sistema procesa 500+ SKUs y redujo el tiempo de inventario de 4 horas a 45 minutos.',
      tags: ['Excel', 'VBA', 'Gestión de Inventario'],
      submittedAt: '2026-05-15',
    },
    skills: ['Automatización de procesos', 'Programación VBA', 'Gestión de operaciones'],
  },
  {
    id: 'v2',
    candidate: { name: 'Valeria Torres', initials: 'VT', avatarColor: 'bg-rose-500', career: 'Comunicaciones — PUCP', score: 445 },
    project: {
      title: 'Estrategia de contenido para ONG ambiental',
      description: 'Diseñé e implementé la estrategia de redes sociales para una ONG de conservación marina en Lima. En 3 meses crecimos de 800 a 4,200 seguidores en Instagram con engagement rate del 8.3% y logramos viralizar una campaña que llegó a 120k personas.',
      tags: ['Marketing Digital', 'Redes Sociales', 'Estrategia de Contenido'],
      submittedAt: '2026-05-14',
    },
    skills: ['Marketing digital', 'Creación de contenido', 'Gestión de comunidades'],
  },
]
