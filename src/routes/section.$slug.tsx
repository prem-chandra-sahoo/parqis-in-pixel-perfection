import { createFileRoute, notFound } from "@tanstack/react-router";
import { ProductCard } from "@/components/parqis/ProductCard";
import { Grid, PageShell } from "@/components/parqis/PageShell";
import { sections, slug } from "@/lib/store";

export const Route = createFileRoute("/section/$slug")({
  loader: ({ params }) => {
    const s = sections.find((x) => x.kind === "row" && slug(x.title) === params.slug);
    if (!s || s.kind !== "row") throw notFound();
    return s;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "Collection"} - PARQIS` },
      { name: "description", content: `Shop the ${loaderData?.title ?? "collection"} on PARQIS.` },
      { property: "og:title", content: `${loaderData?.title ?? "Collection"} - PARQIS` },
      { property: "og:description", content: "Shop this PARQIS collection." },
    ],
  }),
  component: SectionPage,
});

function SectionPage() {
  const s = Route.useLoaderData();

  return (
    <PageShell title={s.title}>
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mb-6 flex items-center justify-between border-b pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">{s.title}</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Handpicked styles and curated festive fashion
            </p>
          </div>
          <span className="text-xs font-semibold text-muted-foreground">
            {s.products.length} {s.products.length === 1 ? "Product" : "Products"}
          </span>
        </div>

        <Grid>
          {s.products.map((p) => (
            <ProductCard key={p.img} p={p} />
          ))}
        </Grid>
      </div>
    </PageShell>
  );
}
