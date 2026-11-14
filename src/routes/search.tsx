import { createFileRoute } from "@tanstack/react-router";
import { SearchBar } from "@/components/parqis/SearchBar";
import { ProductCard } from "@/components/parqis/ProductCard";
import { Grid, PageShell } from "@/components/parqis/PageShell";
import { searchProducts } from "@/lib/store";

export const Route = createFileRoute("/search")({
  validateSearch: (s: Record<string, unknown>) => ({ q: typeof s.q === "string" ? s.q : "" }),
  head: () => ({ meta: [{ title: "Search - PARQIS" }, { name: "description", content: "Search PARQIS products." }, { property: "og:title", content: "Search - PARQIS" }, { property: "og:description", content: "Search PARQIS products." }] }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const res = searchProducts(q);
  return (
    <PageShell title={q ? `Results for "${q}"` : "Search"}>
      <div className="px-4 pt-4 sm:px-6"><SearchBar key={q} variant="light" initial={q} /></div>
      {q && !res.length && <p className="p-8 text-center text-muted-foreground">No products found.</p>}
      <Grid>{res.map((p) => <ProductCard key={p.img} p={p} />)}</Grid>
    </PageShell>
  );
}
