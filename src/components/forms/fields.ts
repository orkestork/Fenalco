export type Field = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "textarea" | "password" | "select";
  options?: string[];
  required?: boolean;
  full?: boolean;
  /** Valor inicial (p. ej. preseleccionar una opción). */
  value?: string;
};

export const contactFields: Field[] = [
  { name: "nombre", label: "Nombre" },
  { name: "apellido", label: "Apellido" },
  { name: "email", label: "Email", type: "email" },
  { name: "telefono", label: "Teléfono o móvil", type: "tel" },
  { name: "mensaje", label: "Mensaje", type: "textarea" },
];
