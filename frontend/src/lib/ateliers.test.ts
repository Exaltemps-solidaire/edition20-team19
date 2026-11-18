import { describe, expect, it } from "vitest";
import { atelierDuParcours } from "./ateliers";

describe("atelierDuParcours", () => {
  it("retourne un atelier pour BURN TO BE ALIVE", () => {
    expect(atelierDuParcours("BURN TO BE ALIVE")?.id).toBe("a1");
  });

  it("retourne un atelier pour BURN'ette is BACK", () => {
    expect(atelierDuParcours("BURN'ette is BACK")?.id).toBe("a2");
  });

  it("retourne null pour un parcours inconnu", () => {
    expect(atelierDuParcours("inconnu")).toBeNull();
  });
});
