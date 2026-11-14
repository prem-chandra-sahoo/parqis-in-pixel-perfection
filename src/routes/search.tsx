import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { SearchBar } from "@/components/parqis/SearchBar";
import { ProductCard } from "@/components/parqis/ProductCard";
import { Grid, PageShell } from "@/components/parqis/PageShell";
import { searchProducts } from "@/lib/store";
import { Search, Sparkles } from "lucide-react";

const POPULAR_SEARCHES = ["Kurta", "Saree", "Dress", "Co-ord", "Shirt", "Ethnic", "Silk", "Men"];

export const Route = createFileRoute("/search")({
  validateSearch: (s: Record<string, unknown>) => ({ q: typeof s["q"] === "string" ? s["q"] : "" }),
  head: () => ({
    meta: [
      { title: "Search Products - PARQIS" },
      { name: "description", content: "Search for festive and everyday outfits on PARQIS." },
      { property: "og:title", content: "Search Products - PARQIS" },
      { property: "og:description", content: "Search for festive and everyday outfits on PARQIS." },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const nav = useNavigate();
  const res = searchProducts(q);

  const handleQuickSearch = (term: string) => {
    nav({ to: "/search", search: { q: term } });
  };

  return (
    <PageShell title={q ? `Results for "${q}"` : "Search Products"}>
      <div className="p-4 sm:p-6 lg:p-8 space-y-5">
        {/* Search Bar Container */}
        <div className="mx-auto max-w-2xl">
          <SearchBar key={q} variant="light" initial={q} />

          {/* Quick Tag Pills */}
          <div className="mt-3 flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span className="text-xs font-medium text-muted-foreground mr-1 flex items-center gap-1">
              <Sparkles className="size-3 text-primary" /> Popular:
            </span>
            {POPULAR_SEARCHES.map((term) => (
              <button
                key={term}
                onClick={() => handleQuickSearch(term)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                  q.toLowerCase() === term.toLowerCase()
                    ? "bg-primary text-primary-foreground font-semibold"
                    : "border border-border/80 bg-background text-foreground hover:bg-muted"
                }`}
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        {/* Results Header */}
        {q ? (
          <div className="flex items-center justify-between border-b pb-3 pt-2">
            <h2 className="text-sm sm:text-base font-semibold text-foreground">
              Results for <span className="text-primary">"{q}"</span>
            </h2>
            <span className="text-xs text-muted-foreground">
              {res.length} {res.length === 1 ? "product" : "products"} found
            </span>
          </div>
        ) : null}

        {/* No Results Empty State */}
        {q && !res.length ? (
          <div className="py-16 text-center">
            <div className="mx-auto mb-3 grid size-16 place-items-center rounded-full bg-muted text-muted-foreground">
              <Search className="size-8" />
            </div>
            <h3 className="text-base font-semibold text-foreground">No matching products found</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Try searching with a different keyword or explore popular tags above.
            </p>
          </div>
        ) : null}

        {/* Product Grid */}
        <Grid>
          {res.map((p) => (
            <ProductCard key={p.img} p={p} />
          ))}
        </Grid>
      </div>
    </PageShell>
  );
}
