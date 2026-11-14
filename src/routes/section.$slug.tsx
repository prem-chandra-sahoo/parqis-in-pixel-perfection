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
  head: ({ loaderData }) => ({ meta: [{ title: `${loaderData?.title ?? "Collection"} - PARQIS` }, { name: "description", content: "Shop this PARQIS collection." }, { property: "og:title", content: `${loaderData?.title ?? "Collection"} - PARQIS` }, { property: "og:description", content: "Shop this PARQIS collection." }] }),
  component: () => {
    const s = Route.useLoaderData();
    return <PageShell title={s.title}><Grid>{s.products.map((p) => <ProductCard key={p.img} p={p} />)}</Grid></PageShell>;
  },
});
