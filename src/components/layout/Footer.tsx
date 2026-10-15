"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { contact, footerLinks, socials } from "@/data/site";

export function Footer() {
  const pathname = usePathname();
  if (pathname === "/") return null; // el inicio tiene su propio pie dentro del último bloque

  return (
    <footer className="border-t border-black/5 bg-white py-10 text-xs text-ink/60">
      <div className="container-x flex flex-col items-center gap-5 text-center">
        <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2">
          <li>FENALCO Bogotá Cundinamarca © 2026</li>
          {footerLinks.map((l) => (
            <li key={l.href}>
              <a href={l.href} {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="hover:text-ink">{l.label}</a>
            </li>
          ))}
        </ul>
        <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2">
          <li>{contact.address}</li>
          <li><a href={contact.phoneHref} className="hover:text-ink">{contact.phone}, {contact.phoneOption}</a></li>
          <li><a href={`mailto:${contact.email}`} className="hover:text-ink">{contact.email}</a></li>
          <li>{contact.hours}</li>
        </ul>
        <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2">
          {socials.map((s) => (
            <li key={s.name}><a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-ink">{s.name}</a></li>
          ))}
          <li><Link href="/sea-miembro-fenalco" className="font-medium text-brand-600 hover:text-brand">Sea miembro</Link></li>
        </ul>
      </div>
    </footer>
  );
}
