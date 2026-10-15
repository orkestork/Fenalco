import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "FENALCO Bogotá Cundinamarca | La fuerza que une al comercio",
    template: "%s | FENALCO Bogotá Cundinamarca",
  },
  description:
    "Gremio de comerciantes de Bogotá y Cundinamarca: representación gremial, capacitaciones, información económica, asesoría jurídica y servicios para empresas.",
  icons: { icon: "/icon.jpg" },
};

export const viewport: Viewport = { themeColor: "#17003f" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${jakarta.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <a href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-mint focus:px-4 focus:py-2 focus:text-brand-950">
          Ir al contenido
        </a>
        <Header />
        <main id="contenido" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
