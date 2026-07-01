export type Lang = 'es' | 'en';

export interface BiLingual {
  es: string;
  en: string;
}

export interface ExpItem {
  current?: boolean;
  date: string;
  co: string;
  logo: string;
  logoMono?: boolean;
  role: BiLingual;
  bullets: { es: string[]; en: string[] };
  tags: string[];
}

export interface EarlyItem {
  role: BiLingual;
  co: string;
  date: string;
  desc: BiLingual;
}

export interface Belt {
  label: BiLingual;
  color: string;
  textOn: string;
}

export type BeltKey = 'white' | 'blue' | 'purple' | 'brown' | 'black';

export interface SkillItem {
  name: string;
  belt: BeltKey;
  stripes: number;
  logo?: string;
  years: BiLingual;
}

export interface ProjectItem {
  tag: BiLingual;
  name: BiLingual;
  desc: BiLingual;
  stack: string[];
}

export interface StatItem {
  num: string;
  label: BiLingual;
}

/* ============ I18N DICTIONARY ============ */
export const dict = {
  heroSub: {
    es: 'Construyo interfaces con Angular y React, backends con Java/Spring Boot y .NET, y desde hace un tiempo, agentes de IA que automatizan procesos reales — desde validación de pedidos hasta flujos de aprovisionamiento cloud. Cinturón azul de BJJ, así que también sé sostener presión bajo presión.',
    en: 'I build interfaces with Angular and React, backends with Java/Spring Boot and .NET, and lately, AI agents that automate real processes — from order validation to cloud provisioning workflows. Blue belt in BJJ, so I also know how to hold position under pressure.'
  },
  heroRole: {
    es: 'FULL STACK ENGINEER SR · 10+ AÑOS · BOGOTÁ, COLOMBIA',
    en: 'SENIOR FULL STACK ENGINEER · 10+ YEARS · BOGOTÁ, COLOMBIA'
  },
  downloadCv: { es: 'Descargar CV (PDF)', en: 'Download CV (PDF)' },
  aboutTitle: { es: 'Sobre mí', en: 'About me' },
  expTitle: { es: 'Experiencia', en: 'Experience' },
  expHintFront: { es: '[ Click ] para ver detalles', en: '[ Click ] to see more details' },
  expHintBack: { es: '[ Click ] para volver', en: '[ Click ] to go back' },
  skillsTitle: { es: 'Stack técnico', en: 'Tech stack' },
  projTitle: { es: 'Proyectos propios', en: 'Personal projects' },
  contactTitle: { es: 'Contacto', en: 'Contact' },
  aboutText: {
    es: `<p>Soy Ingeniero de Sistemas con más de <strong>10 años</strong> moviéndome entre frontend y backend, hoy enfocado en arquitecturas de microservicios, APIs REST escalables e integraciones cloud-native para plataformas de alto tráfico — incluyendo apps bancarias.</p>
         <p>Domino el frontend moderno con <strong>Angular y React</strong>, y backend robusto con <strong>Java/Spring Boot, .NET y Node.js</strong>. En el último año me certifiqué en <strong>Spec-Driven Development con Kiro (AWS)</strong> y adopté un flujo de trabajo AI-First que uso tanto en proyectos enterprise como en mis propios productos.</p>
         <p>Fuera del código, opero mi propia tienda de e-commerce y diseño agentes de automatización para ella — así que entiendo el código no solo como tarea técnica, sino como herramienta de negocio.</p>`,
    en: `<p>I'm a Systems Engineer with over <strong>10 years</strong> moving between frontend and backend, now focused on microservice architectures, scalable REST APIs and cloud-native integrations for high-traffic platforms — including banking apps.</p>
         <p>I'm fluent in modern frontend with <strong>Angular and React</strong>, and solid backend with <strong>Java/Spring Boot, .NET and Node.js</strong>. This past year I certified in <strong>Spec-Driven Development with Kiro (AWS)</strong> and adopted an AI-First workflow I use both in enterprise projects and my own products.</p>
         <p>Outside of code, I run my own e-commerce store and design automation agents for it — so I understand code not just as a technical task, but as a business tool.</p>`
  },
  infoCard: {
    es: `<div class="info-row"><span class="info-k">Ubicación</span><span class="info-v">Bogotá, remoto/híbrido</span></div>
         <div class="info-row"><span class="info-k">Disponibilidad</span><span class="info-v">Inmediata</span></div>
         <div class="info-row"><span class="info-k">Industrias</span><span class="info-v">Fintech · Telco · SaaS</span></div>
         <div class="info-row"><span class="info-k">Inglés</span><span class="info-v">A2 · en curso</span></div>
         <div class="info-row"><span class="info-k">Idioma nativo</span><span class="info-v">Español</span></div>
         <div class="info-row"><span class="info-k">Certificación</span><span class="info-v">Spec-Driven Dev · AWS</span></div>`,
    en: `<div class="info-row"><span class="info-k">Location</span><span class="info-v">Bogotá, remote/hybrid</span></div>
         <div class="info-row"><span class="info-k">Availability</span><span class="info-v">Immediate</span></div>
         <div class="info-row"><span class="info-k">Industries</span><span class="info-v">Fintech · Telco · SaaS</span></div>
         <div class="info-row"><span class="info-k">English</span><span class="info-v">A2 · in progress</span></div>
         <div class="info-row"><span class="info-k">Native language</span><span class="info-v">Spanish</span></div>
         <div class="info-row"><span class="info-k">Certification</span><span class="info-v">Spec-Driven Dev · AWS</span></div>`
  },
  beltNote: {
    es: 'Lo organizo como cinturones de jiu-jitsu: el color marca el dominio, las franjas el tiempo dentro de ese nivel. <code>10 años</code> de fondo, pero cada tecnología tiene su propio progreso.',
    en: 'I organize it like jiu-jitsu belts: the color marks mastery, the stripes mark time within that level. <code>10 years</code> overall, but each technology has its own progress.'
  },
  footerText: {
    es: 'Danilo Andrés Pineda Moreno — Bogotá, Colombia · build 2026',
    en: 'Danilo Andrés Pineda Moreno — Bogotá, Colombia · build 2026'
  },
  termHelp: {
    es: 'Comandos disponibles:\n  whoami       → quién soy\n  experience   → ir a experiencia\n  skills       → ir al stack técnico\n  projects     → ir a proyectos\n  contact      → ir a contacto\n  lang en/es   → cambiar idioma\n  clear        → limpiar pantalla',
    en: 'Available commands:\n  whoami       → who I am\n  experience   → jump to experience\n  skills       → jump to tech stack\n  projects     → jump to projects\n  contact      → jump to contact\n  lang en/es   → switch language\n  clear        → clear screen'
  },
  termWhoami: {
    es: 'Danilo Andrés Pineda · Ingeniero de Sistemas · Full Stack Engineer Sr\n10+ años · Angular, React, Java/Spring Boot, .NET, Node.js · Bogotá, Colombia',
    en: 'Danilo Andrés Pineda · Systems Engineer · Senior Full Stack Engineer\n10+ years · Angular, React, Java/Spring Boot, .NET, Node.js · Bogotá, Colombia'
  },
  termWelcome: {
    es: 'Bienvenido. Escribe <strong>help</strong> para ver los comandos disponibles.',
    en: 'Welcome. Type <strong>help</strong> to see available commands.'
  },
  termNav: {
    experience: { es: 'Saltando a experiencia…', en: 'Jumping to experience…' },
    skills: { es: 'Saltando al stack técnico…', en: 'Jumping to tech stack…' },
    projects: { es: 'Saltando a proyectos…', en: 'Jumping to projects…' },
    contact: { es: 'Saltando a contacto…', en: 'Jumping to contact…' }
  },
  termCoffee: {
    es: '☕ Preparando café… listo. Productividad +100%.',
    en: '☕ Brewing coffee… done. Productivity +100%.'
  },
  termOss: {
    es: 'Cinturón azul de BJJ. Sostengo posición incluso bajo presión de deadline.',
    en: 'Blue belt in BJJ. I hold position even under deadline pressure.'
  },
  termLangSwitched: { es: 'Idioma cambiado a español.', en: 'Language switched to English.' },
  contact: {
    es: { line0: '$ ./contact.sh --reach-out', email: 'email:', phone: 'teléfono:', linkedin: 'linkedin:', github: 'github:', copy: 'copiar', copied: '¡copiado!', closing: '# proceso completado — listo para la siguiente llamada.', cta: 'Escríbeme' },
    en: { line0: '$ ./contact.sh --reach-out', email: 'email:', phone: 'phone:', linkedin: 'linkedin:', github: 'github:', copy: 'copy', copied: 'copied!', closing: '# process complete — ready for the next call.', cta: 'Email me' }
  }
};

/* ============ EXPERIENCE DATA ============ */
export const expData: ExpItem[] = [
  {
    date: 'ABR 2023 — MAY 2026', co: 'ADL Digital Lab S.A. · Bogotá', logo: 'logos/adl-digital-lab.svg',
    role: { es: 'Ingeniero Frontend SSR', en: 'Frontend SSR Engineer' },
    bullets: {
      es: [
        'Apps microfrontend con Angular y React JS para plataformas bancarias de alto tráfico.',
        'UI bajo principios de Design System y accesibilidad para productos financieros.',
        'Funciones serverless con AWS Lambda para consumo de APIs y procesamiento de eventos.',
        'Microservicios backend con Spring Boot y Node.js bajo enfoque Spec-Driven Development.',
        'Adopción de prácticas AI-First para generación de código y documentación técnica.'
      ],
      en: [
        'Microfrontend apps with Angular and React JS for high-traffic banking platforms.',
        'UI built on Design System principles and accessibility for financial products.',
        'Serverless functions with AWS Lambda for API consumption and event processing.',
        'Backend microservices with Spring Boot and Node.js under a Spec-Driven Development approach.',
        'Adoption of AI-First practices for code generation and technical documentation.'
      ]
    },
    tags: ['Angular', 'React JS', 'Microfrontend', 'AWS Lambda', 'Node JS', 'Quarkus', 'CI/CD']
  },
  {
    date: 'JUL 2022 — FEB 2023', co: 'Novatec S.A. · Bogotá', logo: 'logos/novatec.png',
    role: { es: 'Ingeniero de Desarrollo Full Stack', en: 'Full Stack Development Engineer' },
    bullets: {
      es: [
        'Microservicios de integración bancaria con Spring Boot (Java) y Node.js en tiempo real.',
        'Plataforma de adquisición de vehículos para Banco Santander (Angular + Spring Boot + SQL Server).',
        'Containerización con Docker y orquestación con Kubernetes para escalabilidad horizontal.'
      ],
      en: [
        'Real-time banking integration microservices with Spring Boot (Java) and Node.js.',
        'Vehicle acquisition platform for Banco Santander (Angular + Spring Boot + SQL Server).',
        'Containerization with Docker and Kubernetes orchestration for horizontal scalability.'
      ]
    },
    tags: ['Spring Boot', 'Java', 'Node JS', 'Angular', 'Docker', 'SQL Server']
  },
  {
    date: 'JUL 2021 — FEB 2022', co: 'Accenture S.A. · Bogotá', logo: 'logos/accenture.svg',
    role: { es: 'Senior Analyst .NET / Full Stack', en: 'Senior Analyst .NET / Full Stack' },
    bullets: {
      es: [
        'Diseños funcionales y microservicios para promociones, aprovisionamiento y facturación de ETB.',
        'APIs REST con C# / .NET y MongoDB para catálogo de productos, integradas con sistemas legacy.'
      ],
      en: [
        "Functional designs and microservices for ETB's promotions, provisioning and billing.",
        'REST APIs with C# / .NET and MongoDB for the product catalog, integrated with legacy systems.'
      ]
    },
    tags: ['C# / .NET', 'REST API', 'MongoDB', 'HTML5']
  },
  {
    date: 'JUL 2017 — JUL 2021', co: 'IFX Networks · Bogotá', logo: 'logos/ifx-networks.svg',
    role: { es: 'Ing. de Desarrollo — Cloud & Automatización', en: 'Development Engineer — Cloud & Automation' },
    bullets: {
      es: [
        'Automatización de la plataforma de aprovisionamiento cloud con .NET, Node.js, Angular, React JS y PowerShell — redujo cargas operativas en <strong>60%</strong>.',
        'Virtualización e infraestructura con VMware/Hyper-V, MongoDB, SQL Server, LINQ y Entity Framework.'
      ],
      en: [
        'Automated the cloud provisioning platform with .NET, Node.js, Angular, React JS and PowerShell — cut operational workload by <strong>60%</strong>.',
        'Virtualization and infrastructure with VMware/Hyper-V, MongoDB, SQL Server, LINQ and Entity Framework.'
      ]
    },
    tags: ['.NET', 'Node JS', 'PowerShell', 'DevOps', 'VMware', 'Entity FW']
  }
];

export const earlyData: EarlyItem[] = [
  {
    role: { es: 'Ing. Desarrollo Móvil', en: 'Mobile Development Engineer' },
    co: 'Vision Mobile SAS', date: '2016 — 2017',
    desc: { es: 'Apps con Ionic, Angular JS, Node.js y Firebase.', en: 'Apps with Ionic, Angular JS, Node.js and Firebase.' }
  },
  {
    role: { es: 'Desarrollador Web', en: 'Web Developer' },
    co: 'Color al Cuadrado SAS', date: '2015 — 2016',
    desc: { es: 'PHP, JavaScript, MySQL y WordPress.', en: 'PHP, JavaScript, MySQL and WordPress.' }
  },
  {
    role: { es: 'Desarrollador Web', en: 'Web Developer' },
    co: 'Webpaje Internet Marketing', date: '2011 — 2014',
    desc: { es: 'SEO/SEM, PHP, JavaScript, WordPress y Joomla.', en: 'SEO/SEM, PHP, JavaScript, WordPress and Joomla.' }
  }
];

export const earlyHeader: BiLingual = {
  es: 'Inicios: móvil, web y marketing digital',
  en: 'Early years: mobile, web and digital marketing'
};

/* ============ BELTS ============ */
export const belts: Record<BeltKey, Belt> = {
  white:  { label: { es: 'Blanca', en: 'White' },   color: 'var(--belt-white)',  textOn: '#11141a' },
  blue:   { label: { es: 'Azul', en: 'Blue' },       color: 'var(--belt-blue)',   textOn: '#fff' },
  purple: { label: { es: 'Morada', en: 'Purple' },   color: 'var(--belt-purple)', textOn: '#fff' },
  brown:  { label: { es: 'Marrón', en: 'Brown' },    color: 'var(--belt-brown)',  textOn: '#fff' },
  black:  { label: { es: 'Negra', en: 'Black' },     color: 'var(--belt-black)',  textOn: '#e8a33d' }
};

/* ============ SKILLS ============ */
export const skills: SkillItem[] = [
  { name: 'Angular',           belt: 'black',  stripes: 4, logo: 'logos/tech/angular.svg',    years: { es: '10+ años', en: '10+ years' } },
  { name: '.NET / C#',         belt: 'black',  stripes: 3, logo: 'logos/tech/dotnet.svg',     years: { es: '9 años', en: '9 years' } },
  { name: 'React JS',          belt: 'brown',  stripes: 3, logo: 'logos/tech/react.svg',      years: { es: '5 años', en: '5 years' } },
  { name: 'Java / Spring Boot',belt: 'brown',  stripes: 2, logo: 'logos/tech/spring.svg',     years: { es: '5 años', en: '5 years' } },
  { name: 'Node.js',           belt: 'brown',  stripes: 3, logo: 'logos/tech/nodedotjs.svg',  years: { es: '6 años', en: '6 years' } },
  { name: 'TypeScript',        belt: 'brown',  stripes: 2, logo: 'logos/tech/typescript.svg', years: { es: '6 años', en: '6 years' } },
  { name: 'Ionic / Móvil',     belt: 'purple', stripes: 2, logo: 'logos/tech/ionic.svg',      years: { es: 'app bancaria Banco Popular', en: 'banking app, Banco Popular' } },
  { name: 'AWS Cloud / Lambda',belt: 'blue',   stripes: 3, logo: 'logos/tech/aws.svg',        years: { es: 'certificado 2026', en: 'certified 2026' } },
  { name: 'Docker / Kubernetes',belt: 'blue',  stripes: 2, logo: 'logos/tech/docker.svg',     years: { es: '4 años', en: '4 years' } },
  { name: 'AI-First / Spec-Driven', belt: 'blue', stripes: 1, years: { es: 'adopción reciente', en: 'recent adoption' } },
];

/* ============ PROJECTS ============ */
export const projects: ProjectItem[] = [
  {
    tag: { es: 'AI Agent · Automatización', en: 'AI Agent · Automation' },
    name: { es: 'Validador de pedidos COD', en: 'COD order validator' },
    desc: {
      es: 'Agente que integra Shopify, Dropi y Google Maps para validar direcciones y calificar el riesgo de cada pedido contraentrega con un sistema tipo semáforo, antes de que llegue a logística.',
      en: 'An agent that integrates Shopify, Dropi and Google Maps to validate addresses and score the risk of each cash-on-delivery order with a traffic-light system, before it reaches fulfillment.'
    },
    stack: ['Shopify API', 'Dropi', 'Google Maps API', 'AI-First']
  },
  {
    tag: { es: 'E-commerce · Shopify', en: 'E-commerce · Shopify' },
    name: { es: 'Importaciones Korea', en: 'Importaciones Korea' },
    desc: {
      es: 'Tienda de skincare coreano construida sobre el theme Horizon, con componentes de home y página de producto desarrollados a mano en Custom Liquid.',
      en: 'Korean skincare store built on the Horizon theme, with home and product page components hand-built in Custom Liquid.'
    },
    stack: ['Shopify Liquid', 'HTML/CSS', 'DTC / COD']
  }
];

/* ============ IMPACT METRICS ============ */
export const stats: StatItem[] = [
  { num: '10+', label: { es: 'Años de experiencia', en: 'Years of experience' } },
  { num: '60%', label: { es: 'Reducción de cargas operativas (IFX)', en: 'Operational workload cut (IFX)' } },
  { num: '2',   label: { es: 'Apps bancarias en producción', en: 'Banking apps in production' } },
  { num: 'AWS', label: { es: "Spec-Driven Dev · cert. '26", en: "Spec-Driven Dev · cert. '26" } }
];
