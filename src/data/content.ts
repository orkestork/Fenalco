// Contenido redactado para el rediseño a partir de la información pública del sitio actual.
// Las noticias usan titulares y resúmenes breves propios; el texto completo debe cargarse
// desde el CMS oficial de FENALCO cuando el proyecto se conecte a producción.

export type NewsItem = {
  slug: string;
  title: string;
  date: string; // ISO
  image: string;
  summary: string;
  tag: string;
};

export const news: NewsItem[] = [
  {
    slug: "llamado-a-la-calma-manifestaciones-14-octubre",
    title: "FENALCO Bogotá Cundinamarca hace un llamado a la calma durante las manifestaciones del 14 de octubre",
    date: "2026-10-14",
    image: "/img/news/marchas.png",
    tag: "Comunicado",
    summary: "El gremio advierte que las ventas pueden caer hasta 80 % en las zonas de movilización y pide a las autoridades proteger la actividad comercial.",
  },
  {
    slug: "ultima-junta-directiva-juan-esteban-orrego",
    title: "Juan Esteban Orrego participó en su última Junta Directiva como director de FENALCO Bogotá Cundinamarca",
    date: "2026-10-09",
    image: "/img/news/junta-jeo.png",
    tag: "Institucional",
    summary: "Después de 16 años al frente del gremio, Orrego asume el 13 de octubre la presidencia ejecutiva de la Cámara de Comercio de Bogotá. La Junta exaltó su gestión.",
  },
  {
    slug: "rueda-de-negocios-conecta",
    title: "Más de 700 citas y 281.000 potenciales clientes: así se moverá la Rueda de Negocios CONECTA",
    date: "2026-09-30",
    image: "/img/news/conecta.png",
    tag: "Eventos",
    summary: "En alianza con Colsubsidio, la rueda multisectorial del 1 de octubre espera que al menos el 65 % de las citas terminen en negocios.",
  },
  {
    slug: "balance-amor-y-amistad-2026",
    title: "Amor y Amistad dejó un balance positivo para el comercio de Bogotá",
    date: "2026-09-23",
    image: "/img/news/amor-amistad.png",
    tag: "Economía",
    summary: "Gastronomía, entretenimiento y bienestar lideraron la temporada; el tráfico en centros comerciales creció en promedio 20 %.",
  },
  {
    slug: "riesgo-incrementar-tarifas-ica",
    title: "FENALCO reitera el riesgo de incrementar las tarifas del ICA para licores, tabaco y vehículos",
    date: "2026-09-23",
    image: "/img/news/ica.png",
    tag: "Tributario",
    summary: "Ante la votación de la Reforma Tributaria Distrital, el gremio pide al Concejo de Bogotá no aprobar nuevas cargas para el comercio.",
  },
];

export const getNews = (slug: string) => news.find((n) => n.slug === slug);

export type EventItem = {
  slug: string;
  title: string;
  subtitle: string;
  date?: string;
  start?: string;
  end?: string;
  mode: "Virtual" | "Presencial";
  category: string;
  exclusive: boolean;
  image: string;
  topics: string[];
  about?: string;
};

export const events: EventItem[] = [
  {
    slug: "caja-bajo-control",
    title: "Caja bajo control",
    subtitle: "Capital de trabajo, liquidez y financiación para cerrar el año",
    date: "2026-10-16",
    start: "9:00 a.m.",
    end: "10:00 a.m.",
    mode: "Virtual",
    category: "Formación empresarial",
    exclusive: true,
    image: "/img/events/caja.png",
    topics: ["Flujo de caja", "Capital de trabajo", "Ciclo de conversión de efectivo", "Costo real de la deuda", "Factoring y leasing", "Cuándo financiarse"],
  },
  {
    slug: "cartera",
    title: "Cartera",
    subtitle: "Venda más sin poner en riesgo la caja",
    date: "2026-10-21",
    start: "9:00 a.m.",
    end: "10:00 a.m.",
    mode: "Virtual",
    category: "Formación empresarial",
    exclusive: true,
    image: "/img/events/cartera.png",
    topics: ["Prevención de mora", "Política de crédito", "Segmentación", "Indicadores de cartera", "Cobranza temprana", "Castigo de cartera y efectos tributarios"],
  },
  {
    slug: "presupuesto-2027",
    title: "Presupuesto 2027",
    subtitle: "Convierta los números en decisiones de negocio",
    date: "2026-10-28",
    start: "9:00 a.m.",
    end: "10:00 a.m.",
    mode: "Presencial",
    category: "Formación empresarial",
    exclusive: true,
    image: "/img/events/presupuesto.png",
    topics: ["Escenarios", "Ingresos, costos y gastos", "Punto de equilibrio", "Márgenes y EBITDA", "KPIs financieros", "Análisis de sensibilidad"],
  },
  {
    slug: "certificacion-y-recertificacion",
    title: "Certificación y Recertificación",
    subtitle: "Competencias en manejo y transporte de sustancias peligrosas",
    mode: "Virtual",
    category: "Certificaciones",
    exclusive: false,
    image: "/img/events/quimicos.png",
    topics: ["60 horas certificación", "20 horas recertificación", "Resolución 1223 de 2014", "Precio especial para afiliados"],
    about: "Proceso obligatorio para conductores del sector de productos químicos, bajo los parámetros del Ministerio de Transporte.",
  },
];

export const getEvent = (slug: string) => events.find((e) => e.slug === slug);

export const services = [
  {
    id: "auditorio",
    icon: "Theater",
    title: "Auditorio Lorenzo Botero Jaramillo",
    short: "Espacio en el centro de Bogotá para 400 asistentes.",
    text: "Ubicado en el centro de la ciudad y equipado para congresos, lanzamientos, asambleas y foros.",
    features: ["Capacidad para 400 asistentes", "Escenario con sonido, luces y video beam", "Dos camerinos", "Astas de banderas", "Mesa principal", "Parqueaderos cercanos"],
    images: [1, 2, 3, 4, 5, 6].map((i) => `/img/services/auditorio-${i}.png`),
    contact: "301 343 9328 – 310 588 0949",
    download: { label: "Requerimientos técnicos (PDF)", href: "https://fenalcobogota.com.co/wp-content/uploads/2024/05/Rider_Auditorio_Lorenzo_Botero_Fenalco.pdf" },
  },
  {
    id: "asesoria-juridica",
    icon: "Scale",
    title: "Asesoría Jurídica",
    short: "Abogados que resuelven consultas y trámites del comercio.",
    text: "Un equipo jurídico acompaña a los comerciantes en sus consultas legales, laborales, tributarias y en trámites ante entidades.",
    features: ["Consultas legales", "Acompañamiento en trámites", "Actualización normativa"],
  },
  {
    id: "centro-empresarial",
    icon: "Presentation",
    title: "Centro Empresarial FENALCO",
    short: "6 salas renovadas, hasta 100 personas.",
    text: "Espacio recién remodelado en el Edificio FENALCO para reuniones, juntas directivas, lanzamientos y eventos corporativos. Se alquila completo o por salas.",
    features: ["Entrada y recepción independientes", "6 salas", "Zona de entretenimiento", "Capacidad total de 100 personas"],
    images: ["/img/services/centro-empresarial.png"],
  },
  {
    id: "conciliacion",
    icon: "Handshake",
    title: "Centro de Conciliación y Arbitraje",
    short: "Conciliación, arbitraje e insolvencia de persona natural.",
    text: "Abogados y conciliadores expertos para resolver conflictos de forma ágil, sin llegar a un juicio.",
    features: ["Conciliación", "Arbitraje", "Insolvencia de persona natural"],
  },
  {
    id: "formacion",
    icon: "BookOpenCheck",
    title: "Formación Empresarial a la Medida",
    short: "Programas diseñados para los retos de cada empresa.",
    text: "Cursos, talleres y programas integrales que se ajustan a los equipos, tiempos, presupuesto y modalidad de cada organización.",
    features: ["Diagnóstico de necesidades", "Presencial o virtual", "Cursos y programas integrales"],
  },
  {
    id: "informacion-comercial",
    icon: "ShieldCheck",
    title: "Información Comercial",
    short: "Verifique a sus clientes antes de darles crédito.",
    text: "Validamos la información de sus clientes potenciales para que otorgue crédito directo con confianza.",
    features: ["Bureau interno", "Bureau externo", "Análisis financiero", "Cupo sugerido", "Confirmación de referencias"],
  },
] as const;

export const membershipPlans = [
  {
    name: "Inscrito",
    price: "Sin costo",
    note: "Para empresas de 1 a 5 empleados que no hayan estado afiliadas a FENALCO Bogotá Cundinamarca.",
    featured: false,
    includes: ["Representación gremial", "1 capacitación al mes", "2 meses de servicio empresarial sin costo"],
    extras: ["Tarifa plena en eventos y capacitaciones", "Tarifa plena en salones, Centro Empresarial y Auditorio"],
    cta: "Vincularme como Inscrito",
  },
  {
    name: "Afiliado",
    price: "Desde $175.000",
    period: "/mes",
    note: "Descuento por pago anticipado semestral o anual.",
    featured: true,
    includes: [
      "Participación en comités gremiales y grupos de difusión",
      "Elegir y ser elegido en la Junta Directiva",
      "Informes económicos, normativos y legislativos",
      "Asesoría legal permanente",
      "4 capacitaciones al mes",
      "Promoción de su empresa",
      "4 meses de servicio empresarial sin costo",
      "Directorio “Fenalco compra Fenalco”",
      "Plan de beneficios con aliados",
      "Vende más: financiación para su cliente final",
    ],
    extras: ["30 % de descuento en eventos y capacitaciones", "20 % de descuento en salones, Centro Empresarial y Auditorio"],
    cta: "Vincularme como Afiliado",
  },
];

export const testimonial = {
  quote: "Ser agremiado a FENALCO nos da seguridad, conocimiento y espacios para hacer negocios con personas y empresas.",
  author: "Guillermo González",
  company: "WorldLink",
};

export type EconReport = { title: string; date: string; category: string };

export const econReports: EconReport[] = [
  { title: "Boletín Motocicletas Nuevas – Agosto 2026", date: "2026-09-01", category: "Automotor" },
  { title: "Boletín Vehículos Nuevos – Agosto 2026", date: "2026-09-01", category: "Automotor" },
  { title: "Bitácora Económica – Agosto 2026", date: "2026-08-27", category: "Bitácora económica" },
  { title: "Informe Mensual Vehículos Eléctricos – Julio 2026", date: "2026-08-10", category: "Automotor" },
  { title: "Observatorio Jurídico – Agosto 2026", date: "2026-08-06", category: "Observatorio jurídico" },
  { title: "Boletín Económico: Vestuario, Calzado y Cuero (II trimestre 2026)", date: "2026-08-03", category: "Boletín sectorial" },
  { title: "Boletín Económico: Salud (II trimestre 2026)", date: "2026-08-03", category: "Boletín sectorial" },
  { title: "Boletín Económico: Víveres, Abarrotes y Licores (II trimestre 2026)", date: "2026-08-03", category: "Boletín sectorial" },
  { title: "Boletín Vehículos Nuevos – Julio 2026", date: "2026-08-01", category: "Automotor" },
  { title: "Boletín Motocicletas Nuevas – Julio 2026", date: "2026-08-01", category: "Automotor" },
  { title: "Boletín Económico: Educación, Cultura y Deporte (II trimestre 2026)", date: "2026-08-01", category: "Boletín sectorial" },
  { title: "Boletín Económico: Turismo (II trimestre 2026)", date: "2026-08-01", category: "Boletín sectorial" },
];

export const sealPillars = [
  { title: "Con el consumidor", icon: "Users" },
  { title: "Con sus trabajadores", icon: "HardHat" },
  { title: "Con la ciudad y el país", icon: "Landmark" },
  { title: "Con la comunidad y el entorno", icon: "HeartHandshake" },
  { title: "Con la sostenibilidad ambiental", icon: "Leaf" },
  { title: "Con los demás empresarios", icon: "Network" },
];

export const sealCompanies = [
  { name: "Agüita Negra", sector: "Restaurantes, Hoteles y Servicios Turísticos", category: "Restaurantes" },
  { name: "Alfagres SA", sector: "Ferreterías y Materiales para Construcción", category: "Materiales para construcción" },
  { name: "Allmark Comercial de Colombia SA", sector: "Llantas, Talleres y Estaciones de Servicio", category: "Llantas y servicios" },
  { name: "Alsea", sector: "Restaurantes, Hoteles y Servicios Turísticos", category: "Restaurantes" },
  { name: "AT + FIT", sector: "Vestuario, Textiles y Confecciones", category: "Vestuario" },
  { name: "ATTRYBE", sector: "Vestuario, Textiles y Confecciones", category: "Vestuario" },
  { name: "Azulopio Handmade", sector: "Artículos para el Hogar", category: "Decoración" },
  { name: "Bearfut", sector: "Calzado, Cuero y sus Manufacturas", category: "Calzado" },
];

export const customerService = {
  pazYSalvo: {
    cost: "$15.000",
    days: "5 días hábiles",
    steps: [
      "Diligencie y firme el formato FM-PMCL-06 de solicitud de paz y salvo.",
      "Diligencie y firme el acta de recibido a satisfacción.",
      "Adjunte el soporte de pago legible.",
      "Envíe todo a servicioalcliente@fenalcobogota.com.co con el asunto “Solicitud Paz y Salvo” y la cédula del titular.",
    ],
    notes: [
      "El documento se entrega únicamente al correo informado por el solicitante.",
      "Envío físico a otras ciudades: 10 días hábiles y un costo adicional de $32.000.",
      "Un tercero puede recogerlo con carta de autorización firmada y copia de ambas cédulas.",
    ],
  },
  prenda: {
    cost: "$48.000",
    days: "10 días hábiles",
    steps: [
      "Formato FM-PMCL-05 firmado y con huella (uno por cada propietario).",
      "Tarjeta de propiedad legible al 150 % o certificado de tradición de máximo 30 días.",
      "Persona natural: cédula(s) al 150 %. Persona jurídica: cédula del representante legal y Cámara de Comercio de máximo 60 días.",
      "En caso de fallecimiento del titular: acta de defunción, escritura de sucesión y poder de los herederos.",
      "Acta de recibido a satisfacción firmada y soporte de pago.",
    ],
    notes: ["Envío fuera de Bogotá: costo adicional de $32.000."],
  },
  cuentaCobro: {
    docs: ["Documento de identidad (solo en la primera cuenta)", "RUT vigente", "Certificación bancaria", "Planilla de seguridad social (PILA)"],
    hours: "Lunes a viernes de 8:00 a.m. a 12:00 m. y de 2:00 p.m. a 5:00 p.m.",
  },
};
