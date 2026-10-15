import type { Metadata } from "next";
import { PlanConfigurator } from "@/components/membership/PlanConfigurator";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = { title: "Sea miembro FENALCO" };

export default function Page() {
  return (
    <>
      <PageHero
        image="/img/ai/calle-comercial.jpg"
        title="Sea parte del gremio"
        text="Desde el tendero hasta la gran empresa: arme su vinculación a FENALCO Bogotá Cundinamarca en dos pasos."
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
          <Button href="#configurar">Arme su plan</Button>
          <Button href="#vincularme" variant="glass">Hablar con un asesor</Button>
        </div>
      </PageHero>
      <div id="configurar">
        <PlanConfigurator />
      </div>
    </>
  );
}
