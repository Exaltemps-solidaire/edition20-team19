export interface ModuleParcours {
  id: string;
  titre: string;
  description: string;
}

const MODULES_PAR_PARCOURS: Record<string, ModuleParcours[]> = {
  "BURN TO BE ALIVE": [
    { id: "m1", titre: "Module 1 — Comprendre ce qui m'arrive", description: "Repères sur le burn-out et ses effets, pour nommer ce qui se joue." },
    { id: "m2", titre: "Module 2 — Retrouver son énergie", description: "Petits pas concrets pour reconstruire un rythme de vie soutenable." },
    { id: "m3", titre: "Module 3 — Se reconnecter à soi", description: "Exercices doux pour renouer avec ses besoins et ses envies." },
  ],
  "BURN'ette is BACK": [
    { id: "m4", titre: "Module 4 — Se remobiliser à son rythme", description: "Clarifier son rapport au travail avant d'envisager un retour." },
    { id: "m5", titre: "Module 5 — Préparer son retour professionnel", description: "Contenu à venir." },
    { id: "m6", titre: "Module 6 — Tenir dans la durée", description: "Contenu à venir." },
  ],
};

export function modulesDuParcours(parcours: string): ModuleParcours[] {
  return MODULES_PAR_PARCOURS[parcours] ?? [];
}
