export interface Atelier {
  id: string;
  titre: string;
  date: string;
  lieu: string;
}

const ATELIERS_PAR_PARCOURS: Record<string, Atelier> = {
  "BURN TO BE ALIVE": {
    id: "a1",
    titre: "Atelier socle — Respirer et se poser",
    date: "Jeudi 10h00",
    lieu: "En ligne",
  },
  "BURN'ette is BACK": {
    id: "a2",
    titre: "Atelier socle — Préparer son retour",
    date: "Mardi 14h00",
    lieu: "En ligne",
  },
};

export function atelierDuParcours(parcours: string): Atelier | null {
  return ATELIERS_PAR_PARCOURS[parcours] ?? null;
}
