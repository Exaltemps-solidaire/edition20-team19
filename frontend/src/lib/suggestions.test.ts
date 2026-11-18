import { describe, expect, it } from "vitest";
import { suggererParcours, suggererParcoursDepuisStade } from "./suggestions";

describe("suggererParcours", () => {
  it("suggère BURN TO BE ALIVE pour une BURN'ette en reconstruction", () => {
    expect(suggererParcours("burnette-reconstruction")?.parcours).toBe("BURN TO BE ALIVE");
  });

  it("suggère BURN'ette is BACK pour une BURN'ette en remobilisation", () => {
    expect(suggererParcours("burnette-remobilisation")?.parcours).toBe("BURN'ette is BACK");
  });

  it("ne suggère aucun parcours pour un rôle de l'équipe", () => {
    expect(suggererParcours("product-owner")).toBeNull();
  });
});

describe("suggererParcoursDepuisStade", () => {
  it("suggère BURN TO BE ALIVE pour le stade reconstruction", () => {
    expect(suggererParcoursDepuisStade("reconstruction").parcours).toBe("BURN TO BE ALIVE");
  });

  it("suggère BURN'ette is BACK pour le stade remobilisation", () => {
    expect(suggererParcoursDepuisStade("remobilisation").parcours).toBe("BURN'ette is BACK");
  });
});
