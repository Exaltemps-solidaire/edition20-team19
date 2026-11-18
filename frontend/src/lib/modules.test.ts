import { describe, expect, it } from "vitest";
import { modulesDuParcours } from "./modules";

describe("modulesDuParcours", () => {
  it("retourne 3 modules pour BURN TO BE ALIVE", () => {
    expect(modulesDuParcours("BURN TO BE ALIVE")).toHaveLength(3);
  });

  it("retourne 3 modules pour BURN'ette is BACK", () => {
    expect(modulesDuParcours("BURN'ette is BACK")).toHaveLength(3);
  });

  it("retourne une liste vide pour un parcours inconnu", () => {
    expect(modulesDuParcours("inconnu")).toEqual([]);
  });
});
