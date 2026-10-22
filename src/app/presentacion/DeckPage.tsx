"use client";

import { useRouter } from "next/navigation";
import { PresentationDeck } from "@/components/presentation/PresentationDeck";

// Enlace directo a la presentación: al cerrarla vuelve al inicio.
export function DeckPage() {
  const router = useRouter();
  return <PresentationDeck onClose={() => router.push("/")} />;
}
