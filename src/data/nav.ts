export type MegaTile = { label: string; href: string; image: string; caption?: string };
export type MegaLink = { label: string; href: string; external?: boolean };
export type MegaGroup = { label: string; href: string; tiles: MegaTile[]; links: MegaLink[] };

export const megaNav: MegaGroup[] = [
  {
    label: "Gremio",
    href: "/conozcanos",
    tiles: [
      { label: "Quiénes somos", href: "/conozcanos", image: "/img/ai/bogota-aerea.jpg", caption: "Desde 1945" },
      { label: "Junta directiva", href: "/conozcanos#junta-directiva", image: "/img/ai/rueda-negocios.jpg", caption: "19 empresarios" },
      { label: "Informe de gestión", href: "/conozcanos#informe", image: "/img/banners/informe-2025.png", caption: "2025" },
      { label: "Responsabilidad social", href: "/conozcanos#responsabilidad-social", image: "/img/ai/tendero.jpg", caption: "Fundación" },
    ],
    links: [
      { label: "Historia", href: "/conozcanos#historia" },
      { label: "Misión y visión", href: "/conozcanos#mision-vision" },
      { label: "Director ejecutivo", href: "/conozcanos#director" },
      { label: "Protección de datos", href: "/politica-de-datos" },
    ],
  },
  {
    label: "Sectores",
    href: "/sectores-del-comercio",
    tiles: [
      { label: "Los 18 sectores", href: "/sectores-del-comercio", image: "/img/ai/sectores-flatlay.jpg", caption: "Explorar" },
      { label: "Víveres y Abarrotes", href: "/sectores-del-comercio/viveres-abarrotes", image: "/img/ai/tendero.jpg" },
      { label: "Centros Comerciales", href: "/sectores-del-comercio/centros-comerciales-inmobiliarias", image: "/img/ai/calle-comercial.jpg" },
      { label: "Comercio Responsable", href: "/sello-comercio-responsable", image: "/img/ai/tienda-sostenible.jpg" },
    ],
    links: [
      { label: "Automotores", href: "/sectores-del-comercio/automotores" },
      { label: "Salud", href: "/sectores-del-comercio/salud" },
      { label: "Tecnología", href: "/sectores-del-comercio/tecnologia-telecomunicaciones" },
      { label: "Restaurantes y turismo", href: "/sectores-del-comercio/restaurantes-hoteles-turismo" },
      { label: "Vestuario y textiles", href: "/sectores-del-comercio/vestuario-textiles" },
    ],
  },
  {
    label: "Eventos",
    href: "/eventos-y-capacitaciones",
    tiles: [
      { label: "Capacitaciones", href: "/eventos-y-capacitaciones", image: "/img/ai/capacitacion.jpg", caption: "Octubre" },
      { label: "Ruedas de negocio", href: "/eventos-y-capacitaciones", image: "/img/ai/rueda-negocios.jpg", caption: "+130" },
      { label: "Certificaciones", href: "/eventos-y-capacitaciones/certificacion-y-recertificacion", image: "/img/events/quimicos.png" },
      { label: "Memorias", href: "/memorias-eventos", image: "/img/ai/calle-comercial.jpg", caption: "Afiliados" },
    ],
    links: [
      { label: "Caja bajo control", href: "/eventos-y-capacitaciones/caja-bajo-control" },
      { label: "Cartera", href: "/eventos-y-capacitaciones/cartera" },
      { label: "Presupuesto 2027", href: "/eventos-y-capacitaciones/presupuesto-2027" },
    ],
  },
  {
    label: "Servicios",
    href: "/servicios-productos-y-alianzas",
    tiles: [
      { label: "Auditorio", href: "/servicios-productos-y-alianzas#auditorio", image: "/img/services/auditorio-1.png", caption: "400 personas" },
      { label: "Centro Empresarial", href: "/servicios-productos-y-alianzas#centro-empresarial", image: "/img/services/centro-empresarial.png", caption: "6 salas" },
      { label: "Formación a la medida", href: "/servicios-productos-y-alianzas#formacion", image: "/img/ai/capacitacion.jpg" },
      { label: "Información comercial", href: "/servicios-productos-y-alianzas#informacion-comercial", image: "/img/ai/analista-economia.jpg" },
    ],
    links: [
      { label: "Asesoría jurídica", href: "/servicios-productos-y-alianzas#asesoria-juridica" },
      { label: "Conciliación y arbitraje", href: "/servicios-productos-y-alianzas#conciliacion" },
      { label: "Servicio al cliente", href: "/servicio-al-cliente" },
    ],
  },
  {
    label: "Recursos",
    href: "/recursos",
    tiles: [
      { label: "Noticias", href: "/noticias", image: "/img/ai/calle-comercial.jpg" },
      { label: "Información económica", href: "/informacion-economica", image: "/img/ai/analista-economia.jpg", caption: "Boletines" },
      { label: "Directorio de afiliados", href: "/directorio", image: "/img/ai/rueda-negocios.jpg" },
      { label: "Sello Comercio Responsable", href: "/sello-comercio-responsable", image: "/img/ai/tienda-sostenible.jpg" },
    ],
    links: [
      { label: "Centro de recursos", href: "/recursos" },
      { label: "Trámites en línea", href: "/recursos#tramites" },
      { label: "Pagos en línea", href: "/pagos-en-linea" },
      { label: "Actualización de datos", href: "/actualizacion-de-datos" },
      { label: "Ingreso funcionarios", href: "https://intranet.fenalcobogota.com.co", external: true },
    ],
  },
];
