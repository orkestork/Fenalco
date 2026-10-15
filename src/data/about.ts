export const about = {
  intro:
    "Somos el gremio de comerciantes más grande de Colombia. Representamos los intereses de los empresarios ante entidades públicas y privadas, y defendemos la libre empresa y la iniciativa privada.",
  regional:
    "En Bogotá y Cundinamarca acompañamos al comercio y los servicios para que los negocios sean más productivos, rentables y competitivos.",
  benefit:
    "Afiliarse a FENALCO significa contar con el respaldo del gremio con mayor trayectoria del país, además de beneficios comerciales, tributarios y de formación.",
  mission:
    "Trabajar por el desarrollo del comercio y del país: promover la justicia social, fortalecer las instituciones democráticas, impulsar la solidaridad gremial y la modernización de los empresarios, y abrir un espacio de discusión sobre los grandes temas nacionales.",
  vision:
    "Seguir siendo el principal vocero del comercio y defensor de la libertad de empresa, con una estructura sectorial eficiente que reúna al mayor número de empresarios y potencie su productividad.",
  slogan: "La fuerza que une",
};

export const history = [
  {
    year: "1930 – 1945",
    title: "Un contexto de crisis",
    text: "La Gran Depresión y la Segunda Guerra Mundial generan escasez de mercancías importadas. El Gobierno impone controles estrictos de precios y distribución a través de la Interventoría Nacional de Precios.",
  },
  {
    year: "Racionamiento",
    title: "El comercio bajo presión",
    text: "El control derivó en racionamientos y decomisos que golpearon la actividad comercial. Los comerciantes decidieron organizarse para responder.",
  },
  {
    year: "14 de mayo de 1945",
    title: "Nace FENALCO",
    text: "Cerca de 400 comerciantes se reúnen en el Teatro Alameda de Bogotá, convocados por Lorenzo Botero Jaramillo, quien pagó de su bolsillo el alquiler del teatro.",
  },
  {
    year: "Primer logro",
    title: "Fin de la Interventoría",
    text: "Tras varios comités y una intensa gestión, el naciente gremio logra suprimir la Interventoría Nacional de Precios.",
  },
  {
    year: "Hoy",
    title: "Un propósito que se mantiene",
    text: "Darle a los comerciantes las herramientas y la gestión necesarias para ejercer en un entorno favorable, en beneficio económico y social del país.",
  },
];

export const director = {
  name: "Juan Esteban Orrego Calle",
  role: "Director Ejecutivo 2010 – 2026",
  image: "/img/team/director.jpg",
  highlights: [
    { value: "16", label: "años al frente del gremio" },
    { value: "25+", label: "ferias comerciales" },
    { value: "130+", label: "ruedas de negocio" },
  ],
  bio: [
    "Administrador de empresas de la Universidad EAFIT, nacido en Medellín, con trayectoria en las industrias textil, de calzado y ganadera. Hace más de dos décadas hizo de Bogotá su casa.",
    "Inició su vida gremial en el año 2000 representando al sector de Textiles y Confecciones, y en 2003 llegó a la Junta Directiva como delegado de la Presidencia de FENALCO. Desde 2010 dirige la seccional, con énfasis en capacitación, organización y gestión política a favor de los sectores.",
    "Logró que Bogotá fuera sede del Tercer Encuentro entre China y América Latina, con más de 600 empresarios. En octubre de 2026 asume la presidencia ejecutiva de la Cámara de Comercio de Bogotá.",
  ],
};

export type BoardMember = { name: string; company: string; sector: string };

export const board: BoardMember[] = [
  { name: "José Luis Cala Carrizosa", company: "Industrias SPRING SAS", sector: "Artículos para el Hogar" },
  { name: "Roberto Morales", company: "Autogermana", sector: "Automotores" },
  { name: "Jesús Mejía Godoy", company: "Calzatodo SA", sector: "Calzado, Cuero y sus Manufacturas" },
  { name: "Yazmín Lombana", company: "Centro Comercial Titán Plaza", sector: "Centros Comerciales e Inmobiliarias" },
  { name: "Alberto Rodríguez Uribe", company: "Agencia de Aduanas ABC Repecev SAS Nivel 1", sector: "Comercio Exterior" },
  { name: "Luis Eduardo Rodríguez", company: "FB Certification SAS", sector: "Educación, Cultura y Deporte" },
  { name: "Claudia Corzo Abello", company: "Ferretería Luis Penagos SA", sector: "Ferreterías y Materiales de Construcción" },
  { name: "Astrid Otálora", company: "Alkosto SA", sector: "Grandes Superficies" },
  { name: "Marisol Carreira López", company: "Joyería Arlop SAS", sector: "Joyerías y Artículos de Lujo" },
  { name: "José María Serna Rivas", company: "All Mark Comercial de Colombia SA", sector: "Llantas y Servicios Automotor" },
  { name: "Álvaro Rojas Anaya", company: "Laboratorios Servinsumos SA", sector: "Productos Químicos e Insumos Agropecuarios" },
  { name: "Germán Rubiano Sánchez", company: "Industria de Restaurantes Casuales SAS", sector: "Restaurantes, Hoteles y Turismo" },
  { name: "María Cristina Camargo Pérez", company: "Importadora Gran Andina SAS", sector: "Repuestos para Automotores y Maquinaria" },
  { name: "Mauricio Quintero Guarín", company: "Coopidrogas", sector: "Salud" },
  { name: "Juan Manuel Cubides Rodríguez", company: "Inter Rapidísimo", sector: "Servicios al Comercio" },
  { name: "Alejandro Noguera Gutiérrez", company: "Mercado Libre", sector: "Tecnología y Telecomunicaciones" },
  { name: "Daniel Alberto Acevedo Escobar", company: "Permoda", sector: "Vestuario, Textiles y Confecciones" },
  { name: "Marcela Ramírez", company: "OXXO Colombia SAS", sector: "Víveres y Abarrotes" },
  { name: "Diego Zuloaga Sevilla", company: "Casa Toro", sector: "Delegado Junta Nacional" },
];

export const csr = {
  title: "Fundación FENALCO Bogotá Responsable",
  text: "Fortalece el sector social y apoya proyectos de impacto que ayudan a reducir la pobreza y acompañan a poblaciones vulnerables.",
  contactName: "Elena Avendaño",
  phone: "300 546 6565",
  email: "directora@fundacionfenalcobogota.org",
  image: "/img/banners/rse.png",
};

export const report = {
  title: "Informe de Gestión 2025",
  text: "Un recorrido por el trabajo que hizo el gremio durante 2025 en favor del comercio de Bogotá y la región.",
  image: "/img/banners/informe-2025.png",
  href: "https://fenalcobogota.com.co/wp-content/uploads/2026/10/Informe-de-Gestion-2025.pdf",
};
