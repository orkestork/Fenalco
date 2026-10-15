export const ORIGINAL_URL = "https://fenalcobogota.com.co";

export const contact = {
  name: "FENALCO Bogotá Cundinamarca",
  address: "Carrera 4 # 19-85, Bogotá D.C.",
  phone: "(601) 350 0699",
  phoneOption: "opción 1",
  phoneHref: "tel:+576013500699",
  email: "servicioalcliente@fenalcobogota.com.co",
  suppliersEmail: "proveedores@fenalcobogota.com.co",
  privacyEmail: "protecciondedatos@fenalcobogota.com.co",
  hours: "Lunes a viernes · 8:00 a.m. – 5:30 p.m.",
  nit: "860009161",
};

export const socials = [
  { name: "Facebook", href: "https://www.facebook.com/FenalcoBogota" },
  { name: "X", href: "https://x.com/FenalcoBogota" },
  { name: "Instagram", href: "https://www.instagram.com/fenalcobogota/" },
  { name: "TikTok", href: "https://www.tiktok.com/@fenalcobogota" },
  { name: "YouTube", href: "https://www.youtube.com/channel/UC4_oAjihPKp7TP2KEQn6DOA" },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/fenalcobogota" },
] as const;

export type NavItem = { label: string; href: string; external?: boolean; description?: string };

export const mainNav: NavItem[] = [
  { label: "Conózcanos", href: "/conozcanos", description: "Historia, misión, junta directiva e informe de gestión" },
  { label: "Sectores", href: "/sectores-del-comercio", description: "18 sectores que representan al comercio de la región" },
  { label: "Eventos", href: "/eventos-y-capacitaciones", description: "Capacitaciones, ruedas de negocio y formación empresarial" },
  { label: "Servicios", href: "/servicios-productos-y-alianzas", description: "Auditorio, asesoría jurídica, conciliación y más" },
  { label: "Noticias", href: "/noticias", description: "La voz del gremio en la agenda pública" },
  { label: "Información económica", href: "/informacion-economica", description: "Boletines, bitácoras y observatorio jurídico" },
];

export const secondaryNav: NavItem[] = [
  { label: "Memorias de eventos", href: "/memorias-eventos" },
  { label: "Directorio de afiliados", href: "/directorio" },
  { label: "Sello Comercio Responsable", href: "/sello-comercio-responsable" },
  { label: "Ingreso funcionarios", href: "https://intranet.fenalcobogota.com.co", external: true },
];

export const quickActions: NavItem[] = [
  { label: "Pagos en línea", href: "/pagos-en-linea" },
  { label: "Sea miembro", href: "/sea-miembro-fenalco" },
  { label: "Actualización de datos", href: "/actualizacion-de-datos" },
];

export const footerLinks: NavItem[] = [
  { label: "Solicitud paz y salvo", href: "/servicio-al-cliente#paz-y-salvo" },
  { label: "Levantamiento de prenda", href: "/servicio-al-cliente#levantamiento-de-prenda" },
  { label: "PQRS", href: "/servicio-al-cliente#pqrs" },
  { label: "Envío cuenta de cobro", href: "/servicio-al-cliente#cuenta-de-cobro" },
  { label: "Política de protección de datos", href: "/politica-de-datos" },
  { label: "FENALCO Nacional", href: "https://www.fenalco.com.co", external: true },
];

export const stats = [
  { value: 18000, suffix: "+", label: "Empresas afiliadas en el país" },
  { value: 1945, suffix: "", label: "Año de fundación del gremio", plain: true },
  { value: 18, suffix: "", label: "Sectores del comercio representados" },
  { value: 130, suffix: "+", label: "Ruedas de negocio realizadas" },
];

export const heroSlides = [
  {
    eyebrow: "Capacitaciones virtuales · Octubre",
    title: "Finanzas para cerrar el año con la caja en orden",
    text: "Cuatro sesiones prácticas sobre liquidez, cartera y presupuesto 2027. Exclusivo para afiliados.",
    cta: { label: "Ver capacitaciones", href: "/eventos-y-capacitaciones" },
    image: "/img/banners/capacitaciones.png",
  },
  {
    eyebrow: "Eficiencia energética",
    title: "Haz que cada kilovatio trabaje a favor de tu negocio",
    text: "Guía para que los comercios consuman menos energía y ganen competitividad.",
    cta: { label: "Conocer más", href: "/servicios-productos-y-alianzas" },
    image: "/img/banners/energia.png",
  },
  {
    eyebrow: "Agenda 2026",
    title: "Calendario de eventos del comercio",
    text: "Ferias, ruedas de negocio, foros y formación para empresarios de Bogotá y Cundinamarca.",
    cta: { label: "Ver agenda", href: "/eventos-y-capacitaciones" },
    image: "/img/banners/calendario.png",
  },
];
