"use client";

import { useState } from "react";
import { PERSONAS, suggererParcours, type PersonaId } from "@/lib/suggestions";
import styles from "./page.module.css";

export default function Home() {
  const [personaId, setPersonaId] = useState<PersonaId | null>(null);

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
  const suggestion = suggererParcours(personaId);

  return (
    <main className={styles.main}>
      <button type="button" onClick={() => setPersonaId(null)}>
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
