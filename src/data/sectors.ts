export type Person = { name: string; image?: string };

export type Sector = {
  slug: string;
  name: string;
  icon: string;
  summary: string;
  members: string[];
  managers: Person[];
  committees: { title: string; text?: string }[];
  representative: { name: string; company: string };
};

const t = (file: string) => `/img/team/${file}`;

export const sectorsIntro =
  "Representamos a los comerciantes de Bogotá y la región a través de 18 sectores. Cada uno cuenta con un gerente gremial que sigue de cerca la agenda regulatoria, tributaria y legal del sector, y atiende directamente a los afiliados.";

export const sectors: Sector[] = [
  {
    slug: "articulos-para-el-hogar",
    name: "Artículos para el Hogar",
    icon: "Sofa",
    summary: "Fabricantes y comercializadores de muebles, colchones, electrodomésticos, juguetes, decoración, artesanías, galerías de arte y floristerías.",
    members: ["Juguetes y detalles", "Colchones", "Electrodomésticos", "Muebles hogar y oficina", "Decoración", "Floristerías"],
    managers: [{ name: "Andrea Melo", image: t("Andrea-Melo-600x600-1.png") }, { name: "Paola Arias", image: t("Paola-Arias-600x600-1.png") }],
    committees: [
      { title: "Comité técnico de Seguridad de los Juguetes – ICONTEC", text: "Construye por consenso normas técnicas de calidad y seguridad para juguetes, incluidos los electrónicos." },
      { title: "Comité técnico de Muebles, Colchones y Espumas", text: "Participa en la actualización de la norma técnica para colchones y colchonetas de uso doméstico." },
      { title: "Brochure Artículos para el Hogar", text: "Vitrina de empresas que nació en la Zona M del 12 de Octubre y hoy se extiende a otras zonas de la ciudad." },
    ],
    representative: { name: "José Luis Cala Carrizosa", company: "Industrias SPRING SAS" },
  },
  {
    slug: "automotores",
    name: "Automotores",
    icon: "Car",
    summary: "Concesionarios de vehículos y motos, vehículos eléctricos, empresas de taxis, arrendadoras, carrocerías y accesorios para motociclistas.",
    members: ["Concesionarios", "Vehículos eléctricos", "Taxis", "Renta de vehículos", "Cascos y accesorios"],
    managers: [{ name: "William Alfaro", image: t("William.png") }, { name: "Jacqueline Pelayo", image: t("Jacqueline-Pelayo-600x600-1.png") }],
    committees: [
      { title: "Comité de Cascos y Accesorios para Motocicletas" },
      { title: "Comité Técnico ICONTEC de cascos y motos" },
      { title: "Comité de Empresas de Taxis" },
      { title: "Comité de Concesionarios de vehículos y motos" },
      { title: "Comité de Transporte Especial" },
    ],
    representative: { name: "Roberto Morales", company: "Autogermana" },
  },
  {
    slug: "calzado-cuero",
    name: "Calzado, Cuero y sus Manufacturas",
    icon: "Footprints",
    summary: "Fabricantes, importadores y distribuidores de calzado, marroquinería e insumos del cuero.",
    members: ["Fabricantes", "Distribuidores de insumos", "Producto terminado", "Importadores"],
    managers: [],
    committees: [{ title: "Comité de Calzado de ICONTEC" }],
    representative: { name: "Jesús Mejía Godoy", company: "Calzatodo SA" },
  },
  {
    slug: "centros-comerciales-inmobiliarias",
    name: "Centros Comerciales e Inmobiliarias",
    icon: "Building2",
    summary: "Centros comerciales de todos los formatos, parqueaderos e inmobiliarias.",
    members: ["Centros comerciales", "Parqueaderos", "Inmobiliarias"],
    managers: [
      { name: "Andrea Delgado", image: t("Andrea-Delgado.png") },
      { name: "Alejandra Arrieta", image: t("Alejandra-Arrieta.png") },
      { name: "Juan Pablo Velandia (Inmobiliarias)", image: t("Juan-Pablo-V.png") },
    ],
    committees: [],
    representative: { name: "Yazmín Lombana", company: "Centro Comercial Titán Plaza" },
  },
  {
    slug: "comercio-exterior",
    name: "Comercio Exterior",
    icon: "Ship",
    summary: "Importadores, exportadores, aseguradoras y empresas vinculadas a operaciones aduaneras.",
    members: ["Importadores", "Exportadores", "Agencias de aduana", "Aseguradoras"],
    managers: [{ name: "Marlen Corredor", image: t("Marlen.png") }, { name: "María Supelano", image: t("Maria-Supelano.png") }],
    committees: [{ title: "VUCE – Ventanilla Única de Comercio Exterior" }],
    representative: { name: "Alberto Rodríguez Uribe", company: "Agencia de Aduanas ABC Repecev SAS Nivel 1" },
  },
  {
    slug: "educacion-cultura-deporte",
    name: "Educación, Cultura y Deporte",
    icon: "GraduationCap",
    summary: "Universidades, colegios, institutos, papelerías, librerías, editoriales, artes gráficas, medios, música y artículos deportivos.",
    members: ["Instituciones educativas", "Papelerías", "Editoriales", "Publicidad", "Artículos deportivos"],
    managers: [],
    committees: [
      { title: "Comité 158 – Seguridad en juguetes, puericultura y útiles escolares (ICONTEC)" },
      { title: "Comité de Papelerías", text: "Temporada escolar, trabajo con la POLFA contra contrabando y falsificación, el programa ambiental “Cumple con tu Papel, Recicla Ya” y el reglamento técnico de útiles escolares." },
    ],
    representative: { name: "Luis Eduardo Rodríguez", company: "FB Certification SAS" },
  },
  {
    slug: "ferreterias-construccion",
    name: "Ferreterías y Materiales para Construcción",
    icon: "Hammer",
    summary: "Importadores y comercializadores de materiales, maderas, ferretería pesada, cerámicas y material eléctrico.",
    members: ["Materiales", "Maderas", "Ferretería pesada", "Cerámicas", "Eléctricos"],
    managers: [{ name: "Paula Orrego", image: t("Paula.png") }, { name: "Dani Camacho", image: t("Dani.png") }],
    committees: [
      { title: "Comité Sector Paloquemao", text: "Trabajo con la Alcaldía Local de Los Mártires para crear un centro comercial a cielo abierto especializado." },
      { title: "Comité de Actualización Tributaria (DIAN – Secretaría de Hacienda)" },
      { title: "Comité de Importaciones, Contrabando y Estatuto Aduanero (POLFA – DIAN)" },
    ],
    representative: { name: "Claudia Corzo Abello", company: "Ferretería Luis Penagos SA" },
  },
  {
    slug: "grandes-superficies",
    name: "Grandes Superficies",
    icon: "Store",
    summary: "Almacenes de gran formato y cadenas nacionales e internacionales.",
    members: ["Hipermercados", "Cadenas", "Tiendas por departamento"],
    managers: [],
    committees: [{ title: "Comité 158 de juguetes – ICONTEC", text: "Adapta normas internacionales de seguridad de juguetes al mercado colombiano." }],
    representative: { name: "Astrid Otálora", company: "Alkosto SA" },
  },
  {
    slug: "joyerias-lujo",
    name: "Joyerías y Accesorios de Lujo",
    icon: "Gem",
    summary: "Productores y comercializadores de metales preciosos, joyas y accesorios de lujo.",
    members: ["Joyerías", "Relojerías", "Metales preciosos", "Bisutería"],
    managers: [],
    committees: [
      { title: "Mesa Sectorial de Joyería y Relojería – SENA", text: "Espacio entre empresa, gobierno y academia para mejorar la formación del talento del sector." },
      { title: "Iniciativa Clúster de Joyería y Bisutería – Cámara de Comercio de Bogotá" },
    ],
    representative: { name: "Marisol Carreira López", company: "Joyería Arlop SAS" },
  },
  {
    slug: "llantas-talleres",
    name: "Llantas, Talleres y Servicios al Automotor",
    icon: "Wrench",
    summary: "Llanteras, CDA, CEA, CRC, estaciones de servicio, servitecas, talleres y proveedores de diagnóstico automotriz.",
    members: ["Llantas", "CDA / CEA / CRC", "Estaciones de servicio", "Talleres"],
    managers: [],
    committees: [{ title: "Comité de CDA" }, { title: "Comité de Llantas" }],
    representative: { name: "José María Serna Rivas", company: "All Mark Comercial de Colombia SA" },
  },
  {
    slug: "quimicos-agropecuarios",
    name: "Productos Químicos e Insumos Agropecuarios",
    icon: "FlaskConical",
    summary: "Importadores y distribuidores de químicos industriales, pinturas e insumos agropecuarios y veterinarios.",
    members: ["Químicos", "Pinturas", "Insumos agropecuarios", "Veterinarios"],
    managers: [],
    committees: [
      { title: "Comité de Veterinarios", text: "Seguimiento a la modificación de la Decisión Andina 769 ante los países de la CAN." },
      { title: "Certificación en sustancias peligrosas", text: "Certificación y recertificación obligatoria para conductores que transportan sustancias peligrosas." },
    ],
    representative: { name: "Álvaro Rojas Anaya", company: "Laboratorios Servinsumos SA" },
  },
  {
    slug: "restaurantes-hoteles-turismo",
    name: "Restaurantes, Hoteles y Servicios Turísticos",
    icon: "UtensilsCrossed",
    summary: "Restaurantes, cadenas de alimentos, hoteles, agencias de viajes, aerolíneas, bares y casinos.",
    members: ["Restaurantes", "Hoteles", "Agencias de viaje", "Bares", "Casinos"],
    managers: [],
    committees: [{ title: "Comité Sector Bares", text: "Articulación con alcaldías locales, Policía, IDIGER y Bomberos para la seguridad del sector." }],
    representative: { name: "Germán Rubiano Sánchez", company: "Industria de Restaurantes Casuales SAS" },
  },
  {
    slug: "repuestos-maquinaria",
    name: "Repuestos para Automotores y Maquinaria",
    icon: "Cog",
    summary: "Comercializadores de repuestos, partes y accesorios para vehículos, maquinaria y equipos.",
    members: ["Repuestos", "Accesorios", "Maquinaria", "Equipos"],
    managers: [],
    committees: [{ title: "Comité de Repuestos" }],
    representative: { name: "María Cristina Camargo Pérez", company: "Importadora Gran Andina SAS" },
  },
  {
    slug: "salud",
    name: "Salud",
    icon: "HeartPulse",
    summary: "Clínicas, laboratorios, ópticas, farmacéuticas, droguerías, dispositivos médicos y cosmética.",
    members: ["Clínicas", "Ópticas", "Droguerías", "Dispositivos médicos", "Cosméticos"],
    managers: [],
    committees: [
      { title: "Comité técnico ICONTEC", text: "Adaptación de la norma ISO 13485 sobre dispositivos médicos." },
      { title: "Ministerio de Salud", text: "Socialización de la ISO 13485:2016 y actualización del Decreto 4725 sobre dispositivos médicos." },
    ],
    representative: { name: "Mauricio Quintero Guarín", company: "Coopidrogas" },
  },
  {
    slug: "servicios-al-comercio",
    name: "Servicios al Comercio",
    icon: "Briefcase",
    summary: "Mensajería, peluquerías, aseo, seguros, lavanderías, vigilancia, laboratorios ambientales y parques cementerio.",
    members: ["Mensajería", "Belleza", "Aseo", "Seguros", "Vigilancia"],
    managers: [],
    committees: [
      { title: "Empresas de Mensajería Express", text: "Seguimiento a la regulación del Ministerio TIC." },
      { title: "Peluquerías y Salones de Belleza", text: "Análisis del proyecto de ley sobre seguridad social del sector." },
      { title: "Parques Cementerio", text: "Observaciones al plan maestro de servicios funerarios y al POT." },
    ],
    representative: { name: "Juan Manuel Cubides Rodríguez", company: "Inter Rapidísimo" },
  },
  {
    slug: "tecnologia-telecomunicaciones",
    name: "Tecnología y Telecomunicaciones",
    icon: "Cpu",
    summary: "Importadores, distribuidores y comercializadores de hardware, software y servicios de telecomunicaciones.",
    members: ["Hardware", "Software", "Operadores", "Distribuidores"],
    managers: [],
    committees: [{ title: "Mesa Sectorial de Equipos Electro-electrónicos – SENA" }],
    representative: { name: "Alejandro Noguera Gutiérrez", company: "Mercado Libre" },
  },
  {
    slug: "vestuario-textiles",
    name: "Vestuario, Textiles y Confecciones",
    icon: "Shirt",
    summary: "Fabricantes y comercializadores de ropa, textiles, confecciones, maquinaria y tintorerías.",
    members: ["Moda", "Textiles", "Confecciones", "Tintorerías"],
    managers: [],
    committees: [
      { title: "Mesas Sectoriales del SENA", text: "Industria textil y Diseño, Confección y Moda: normas de competencia laboral, formación y certificación." },
    ],
    representative: { name: "Daniel Alberto Acevedo Escobar", company: "Permoda" },
  },
  {
    slug: "viveres-abarrotes",
    name: "Víveres y Abarrotes",
    icon: "ShoppingBasket",
    summary: "Distribuidores de consumo masivo, licores, lácteos, cárnicos, autoservicios, superetes, panaderías y plazas de mercado.",
    members: ["Consumo masivo", "Licores", "Autoservicios", "Panaderías", "Plazas de mercado"],
    managers: [],
    committees: [{ title: "Comité de Superetes" }],
    representative: { name: "Marcela Ramírez", company: "OXXO Colombia SAS" },
  },
];

export const getSector = (slug: string) => sectors.find((s) => s.slug === slug);

export const sectorImage = (slug: string) => `/img/sectores/${slug}.jpg`;
