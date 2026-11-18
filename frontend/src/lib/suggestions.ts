// Logique de suggestion de l'itération 1 : encore en dur, le vrai quiz (énergie/stade) arrive plus tard.
export type PersonaId =
  | "burnette-reconstruction"
  | "burnette-remobilisation"
  | "product-owner"
  | "professionnelle";

export interface Persona {
  id: PersonaId;
  nom: string;
  role: string;
}

export const PERSONAS: Persona[] = [
  { id: "burnette-reconstruction", nom: "Camille", role: "La BURN'ette en reconstruction" },
  { id: "burnette-remobilisation", nom: "Leïla", role: "La BURN'ette en remobilisation" },
  { id: "product-owner", nom: "Sophia", role: "La Product Owner de la plateforme" },
  { id: "professionnelle", nom: "Dr Imani", role: "La professionnelle" },
];

export interface Suggestion {
  parcours: string;
  module: string;
  explication: string;
}

export type Energie = "faible" | "elevee";
export type Stade = "reconstruction" | "remobilisation";

export function suggererParcoursDepuisStade(stade: Stade): Suggestion {
  switch (stade) {
    case "reconstruction":
      return {
        parcours: "BURN TO BE ALIVE",
        module: "Module 1 — Comprendre ce qui m'arrive",
        explication: "Ce module socle correspond à une BURN'ette qui débute sa reconstruction.",
      };
    case "remobilisation":
      return {
        parcours: "BURN'ette is BACK",
        module: "Module 4 — Se remobiliser à son rythme",
        explication: "Ce module correspond à une BURN'ette qui prépare sa remobilisation professionnelle.",
      };
  }
}

export function suggererParcours(personaId: PersonaId): Suggestion | null {
  switch (personaId) {
    case "burnette-reconstruction":
      return {
        parcours: "BURN TO BE ALIVE",
        module: "Module 1 — Comprendre ce qui m'arrive",
        explication: "Ce module socle correspond à une BURN'ette qui débute sa reconstruction.",
      };
    case "burnette-remobilisation":
      return {
        parcours: "BURN'ette is BACK",
        module: "Module 4 — Se remobiliser à son rythme",
        explication: "Ce module correspond à une BURN'ette qui prépare sa remobilisation professionnelle.",
      };
    default:
      return null;
  }
}
