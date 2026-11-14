import data from "@/data/store.json";

export type Product = { img: string; name: string; variant: string; price: number; mrp: number; off: number };
export type Section =
  | { kind: "row"; title: string; products: Product[] }
  | { kind: "promo"; img: string };

export const banners: string[] = data.banners;
export const categories: { name: string; img: string }[] = data.categories;
export const sections = data.sections as Section[];

export const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
export const productId = (p: Product) => slug(p.img.split("/").slice(-2).join("-"));
export const formatPrice = (n: number) => "₹" + n.toLocaleString("en-IN", { maximumFractionDigits: 1 });

export const allProducts: Product[] = (() => {
  const m = new Map<string, Product>();
  sections.forEach((s) => s.kind === "row" && s.products.forEach((p) => m.set(productId(p), p)));
  return [...m.values()];
})();

export type Tab = "ALL" | "ETHNIC" | "WESTERN" | "MEN";
const ETHNIC = /suit|kurta|ethnic|saree|anarkali|kurti|co-ord|desi/i;
export function matchesTab(p: Product, tab: Tab) {
  if (tab === "ALL") return true;
  if (tab === "MEN") return /^men\b/i.test(p.name);
  if (tab === "ETHNIC") return ETHNIC.test(p.name);
  return /^women\b/i.test(p.name) && !ETHNIC.test(p.name);
}

export function searchProducts(q: string) {
  const t = q.trim().toLowerCase();
  if (!t) return [];
  return allProducts.filter((p) => `${p.name} ${p.variant}`.toLowerCase().includes(t));
}
