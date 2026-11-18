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
        <p className={styles.eyebrow}>L&apos;BURN</p>
        <h1 className={styles.title}>Qui êtes-vous ?</h1>
        <p className={styles.subtitle}>Choisis un profil pour découvrir ton parcours personnalisé.</p>
        <ul className={styles.list}>
          {PERSONAS.map((persona) => (
            <li key={persona.id}>
              <button type="button" className={styles.card} onClick={() => setPersonaId(persona.id)}>
                <div className={styles.cardName}>{persona.nom}</div>
                <div className={styles.cardRole}>{persona.role}</div>
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
        <button type="button" className={styles.back} onClick={changerDePersona}>
          ← Changer de persona
        </button>
        <h1 className={styles.title}>Évaluation de départ</h1>
        <section className={styles.section}>
          <h2>Ton énergie aujourd&apos;hui</h2>
          <div className={styles.choices}>
            <button
              type="button"
              className={`${styles.chip} ${energie === "faible" ? styles.chipSelected : ""}`}
              onClick={() => setEnergie("faible")}
            >
              Faible
            </button>
            <button
              type="button"
              className={`${styles.chip} ${energie === "elevee" ? styles.chipSelected : ""}`}
              onClick={() => setEnergie("elevee")}
            >
              Élevée
            </button>
          </div>
        </section>
        <section className={styles.section}>
          <h2>Ton stade</h2>
          <div className={styles.choices}>
            <button
              type="button"
              className={`${styles.chip} ${stade === "reconstruction" ? styles.chipSelected : ""}`}
              onClick={() => setStade("reconstruction")}
            >
              Reconstruction
            </button>
            <button
              type="button"
              className={`${styles.chip} ${stade === "remobilisation" ? styles.chipSelected : ""}`}
              onClick={() => setStade("remobilisation")}
            >
              Remobilisation
            </button>
          </div>
        </section>
      </main>
    );
  }

  const suggestion = estBurnette && stade ? suggererParcoursDepuisStade(stade) : suggererParcours(personaId);

  return (
    <main className={styles.main}>
      <button type="button" className={styles.back} onClick={changerDePersona}>
        ← Changer de persona
      </button>
      <h1 className={styles.title}>Bonjour {persona.nom}</h1>
      {suggestion ? (
        <section className={styles.result}>
          <p className={styles.resultLabel}>Suggestion de parcours</p>
          <p className={styles.resultParcours}>{suggestion.parcours}</p>
          <p className={styles.resultModule}>{suggestion.module}</p>
          <p className={styles.resultExplication}>{suggestion.explication}</p>
        </section>
      ) : (
        <p className={styles.empty}>Ce rôle n&apos;a pas de parcours personnel sur la plateforme.</p>
      )}
    </main>
  );
}
