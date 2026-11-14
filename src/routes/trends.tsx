import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/parqis/PageShell";
import { allProducts, formatPrice, productId } from "@/lib/store";

export const Route = createFileRoute("/trends")({
  head: () => ({ meta: [{ title: "Trends - PARQIS" }, { name: "description", content: "Trending looks on PARQIS." }, { property: "og:title", content: "Trends - PARQIS" }, { property: "og:description", content: "Trending looks on PARQIS." }] }),
  component: () => (
    <PageShell title="Trends">
      <div className="grid gap-4 p-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
        {allProducts.filter((_, i) => i % 3 === 0).slice(0, 18).map((p) => (
          <Link key={p.img} to="/product/$id" params={{ id: productId(p) }} className="relative block overflow-hidden rounded-md">
            <img src={p.img} alt={p.name} loading="lazy" className="aspect-[9/14] w-full object-cover" />
            <div className="absolute inset-x-2 bottom-2 rounded-md bg-background/85 p-3 backdrop-blur"><p className="truncate font-medium">{p.name}</p><p className="text-sm">{formatPrice(p.price)} <span className="text-success">{p.off}% OFF</span></p></div>
          </Link>
        ))}
      </div>
    </PageShell>
  ),
});
