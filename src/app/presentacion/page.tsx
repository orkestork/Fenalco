import type { Metadata } from "next";
import { DeckPage } from "./DeckPage";

export const metadata: Metadata = {
  title: "Presentación",
  description: "Oferta de valor de FENALCO Bogotá Cundinamarca: vocería, networking, eventos, beneficios, campañas y servicios para empresas afiliadas.",
};

export default function Page() {
  return <DeckPage />;
}
