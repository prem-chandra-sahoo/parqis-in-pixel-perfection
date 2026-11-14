import { describe, it, expect } from "vitest";
import { matchesTab, searchProducts, type Product } from "./store";
const p = (name: string): Product => ({ img: "x", name, variant: "M · black", price: 1, mrp: 2, off: 50 });
describe("tabs", () => {
  it("MEN shows only men items", () => {
    expect(matchesTab(p("Men Solids Pullover"), "MEN")).toBe(true);
    expect(matchesTab(p("Women Solids Tank top"), "MEN")).toBe(false);
  });
  it("ETHNIC shows suit sets, not tank tops", () => {
    expect(matchesTab(p("Women Embroidered Suit Set"), "ETHNIC")).toBe(true);
    expect(matchesTab(p("Women Solids Tank top"), "ETHNIC")).toBe(false);
  });
  it("search finds bodycon dresses", () => {
    expect(searchProducts("bodycon").length).toBeGreaterThan(0);
  });
});
