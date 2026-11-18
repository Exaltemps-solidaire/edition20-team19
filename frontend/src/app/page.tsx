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
import { modulesDuParcours } from "@/lib/modules";
import { atelierDuParcours } from "@/lib/ateliers";
import styles from "./page.module.css";

const PERSONAS_BURNETTE: PersonaId[] = ["burnette-reconstruction", "burnette-remobilisation"];

export default function Home() {
  const [personaId, setPersonaId] = useState<PersonaId | null>(null);
  const [energie, setEnergie] = useState<Energie | null>(null);
  const [stade, setStade] = useState<Stade | null>(null);
  const [choisirModule, setChoisirModule] = useState(false);
  const [moduleId, setModuleId] = useState<string | null>(null);
  const [inscrit, setInscrit] = useState(false);
  const [atelierReporte, setAtelierReporte] = useState(false);

  function changerDePersona() {
    setPersonaId(null);
    setEnergie(null);
    setStade(null);
    setChoisirModule(false);
    setModuleId(null);
    setInscrit(false);
    setAtelierReporte(false);
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
  const modules = suggestion ? modulesDuParcours(suggestion.parcours) : [];
  const moduleChoisi = moduleId ? modules.find((m) => m.id === moduleId) ?? null : null;
  const atelier = suggestion ? atelierDuParcours(suggestion.parcours) : null;

  if (suggestion && moduleChoisi) {
    return (
      <main className={styles.main}>
        <button type="button" className={styles.back} onClick={() => setModuleId(null)}>
          ← Changer de module
        </button>
        <p className={styles.eyebrow}>Mon module</p>
        <h1 className={styles.title}>{moduleChoisi.titre}</h1>
        <p className={styles.subtitle}>{moduleChoisi.description}</p>
        {atelier && (
          <section className={styles.section}>
            <h2>{atelier.titre}</h2>
            <p className={styles.cardRole}>
              {atelier.date} · {atelier.lieu}
            </p>
            {inscrit ? (
              <p className={styles.resultExplication}>Inscription confirmée pour « {atelier.titre} ».</p>
            ) : atelierReporte ? (
              <p className={styles.resultExplication}>Pas de souci, tu pourras t&apos;inscrire plus tard.</p>
            ) : (
              <div className={styles.choices}>
                <button type="button" className={styles.chip} onClick={() => setInscrit(true)}>
                  S&apos;inscrire
                </button>
                <button type="button" className={styles.chip} onClick={() => setAtelierReporte(true)}>
                  Plus tard
                </button>
              </div>
            )}
          </section>
        )}
      </main>
    );
  }

  if (suggestion && choisirModule) {
    return (
      <main className={styles.main}>
        <button type="button" className={styles.back} onClick={() => setChoisirModule(false)}>
          ← Retour à la suggestion
        </button>
        <h1 className={styles.title}>Choisis ton module</h1>
        <p className={styles.subtitle}>Parcours : {suggestion.parcours}</p>
        <ul className={styles.list}>
          {modules.map((m) => (
            <li key={m.id}>
              <button type="button" className={styles.card} onClick={() => setModuleId(m.id)}>
                <div className={styles.cardName}>{m.titre}</div>
                <div className={styles.cardRole}>{m.description}</div>
              </button>
            </li>
          ))}
        </ul>
      </main>
    );
  }

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
      {suggestion && modules.length > 0 && (
        <button type="button" className={styles.chip} onClick={() => setChoisirModule(true)}>
          Choisir un module
        </button>
      )}
    </main>
  );
}
