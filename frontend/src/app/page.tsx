"use client";

import { useState } from "react";
import {
  PERSONAS,
  suggererParcours,
  suggererParcoursDepuisStade,
  type Energie,
  type PersonaId,
  type Stade,
} from "@/lib/suggestions";
import styles from "./page.module.css";

const PERSONAS_BURNETTE: PersonaId[] = ["burnette-reconstruction", "burnette-remobilisation"];

export default function Home() {
  const [personaId, setPersonaId] = useState<PersonaId | null>(null);
  const [energie, setEnergie] = useState<Energie | null>(null);
  const [stade, setStade] = useState<Stade | null>(null);

  function changerDePersona() {
    setPersonaId(null);
    setEnergie(null);
    setStade(null);
  }

  if (!personaId) {
    return (
      <main className={styles.main}>
        <h1>Qui êtes-vous ?</h1>
        <ul>
          {PERSONAS.map((persona) => (
            <li key={persona.id}>
              <button type="button" onClick={() => setPersonaId(persona.id)}>
                {persona.nom} — {persona.role}
              </button>
            </li>
          ))}
        </ul>
      </main>
    );
  }

  const persona = PERSONAS.find((p) => p.id === personaId)!;
  const estBurnette = PERSONAS_BURNETTE.includes(personaId);

  if (estBurnette && (!energie || !stade)) {
    return (
      <main className={styles.main}>
        <button type="button" onClick={changerDePersona}>
          Changer de persona
        </button>
        <h1>Évaluation de départ</h1>
        <section>
          <h2>Ton énergie aujourd&apos;hui</h2>
          <button type="button" onClick={() => setEnergie("faible")}>
            Faible
          </button>
          <button type="button" onClick={() => setEnergie("elevee")}>
            Élevée
          </button>
        </section>
        <section>
          <h2>Ton stade</h2>
          <button type="button" onClick={() => setStade("reconstruction")}>
            Reconstruction
          </button>
          <button type="button" onClick={() => setStade("remobilisation")}>
            Remobilisation
          </button>
        </section>
      </main>
    );
  }

  const suggestion = estBurnette && stade ? suggererParcoursDepuisStade(stade) : suggererParcours(personaId);

  return (
    <main className={styles.main}>
      <button type="button" onClick={changerDePersona}>
        Changer de persona
      </button>
      <h1>Bonjour {persona.nom}</h1>
      {suggestion ? (
        <section>
          <h2>Suggestion de parcours</h2>
          <p>
            <strong>{suggestion.parcours}</strong>
          </p>
          <p>{suggestion.module}</p>
          <p>{suggestion.explication}</p>
        </section>
      ) : (
        <p>Ce rôle n&apos;a pas de parcours personnel sur la plateforme.</p>
      )}
    </main>
  );
}
