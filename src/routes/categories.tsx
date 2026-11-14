import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/parqis/PageShell";
import { sections, slug } from "@/lib/store";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Categories & Collections - PARQIS" },
      { name: "description", content: "Browse all curated fashion collections on PARQIS." },
      { property: "og:title", content: "Categories & Collections - PARQIS" },
      { property: "og:description", content: "Browse all curated fashion collections on PARQIS." },
    ],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  const rowSections = sections.flatMap((s) => (s.kind === "row" && s.products[0] ? [s] : []));

  return (
    <PageShell title="All Collections">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">Curated Collections</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Explore handpicked festive edits, everyday casuals, and trending styles
            </p>
          </div>
          <span className="text-xs font-semibold text-muted-foreground">
            {rowSections.length} Collections
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7">
          {rowSections.map(
            (s) =>
              s.kind === "row" && (
                <Link
                  key={s.title}
                  to="/section/$slug"
                  params={{ slug: slug(s.title) }}
                  className="group flex flex-col items-center rounded-2xl border border-transparent p-3 text-center transition hover:border-border hover:bg-card hover:shadow-sm"
                >
                  <div className="relative aspect-square w-full overflow-hidden rounded-full bg-muted shadow-sm ring-2 ring-border/50 transition-all duration-300 group-hover:scale-105 group-hover:ring-primary/60">
                    <img
                      src={s.products[0]?.img}
                      alt={s.title}
                      loading="lazy"
                      className="size-full object-cover"
                    />
                  </div>
                  <p className="mt-3 line-clamp-2 text-xs sm:text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                    {s.title}
                  </p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">
                    {s.products.length} {s.products.length === 1 ? "style" : "styles"}
                  </p>
                </Link>
              ),
          )}
        </div>
      </div>
    </PageShell>
  );
}
