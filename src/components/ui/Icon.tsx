import {
  Sofa, Car, Footprints, Building2, Ship, GraduationCap, Hammer, Store, Gem, Wrench, FlaskConical,
  UtensilsCrossed, Cog, HeartPulse, Briefcase, Cpu, Shirt, ShoppingBasket, Theater, Scale, Presentation,
  Handshake, BookOpenCheck, ShieldCheck, Users, HardHat, Landmark, HeartHandshake, Leaf, Network, Circle,
  type LucideIcon, type LucideProps,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  Sofa, Car, Footprints, Building2, Ship, GraduationCap, Hammer, Store, Gem, Wrench, FlaskConical,
  UtensilsCrossed, Cog, HeartPulse, Briefcase, Cpu, Shirt, ShoppingBasket, Theater, Scale, Presentation,
  Handshake, BookOpenCheck, ShieldCheck, Users, HardHat, Landmark, HeartHandshake, Leaf, Network,
};

export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const C = icons[name] ?? Circle;
  return <C {...props} />;
}
