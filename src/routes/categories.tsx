import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/parqis/PageShell";
import { sections, slug } from "@/lib/store";

export const Route = createFileRoute("/categories")({
  head: () => ({ meta: [{ title: "Categories - PARQIS" }, { name: "description", content: "Browse all PARQIS collections." }, { property: "og:title", content: "Categories - PARQIS" }, { property: "og:description", content: "Browse all PARQIS collections." }] }),
  component: () => (
    <PageShell title="Categories">
      <div className="grid grid-cols-3 gap-4 p-4 sm:grid-cols-4 sm:px-6 lg:grid-cols-6">
        {sections.flatMap((s) => (s.kind === "row" && s.products[0] ? [s] : [])).map((s) => s.kind === "row" && (
          <Link key={s.title} to="/section/$slug" params={{ slug: slug(s.title) }} className="text-center">
            <img src={s.products[0].img} alt={s.title} loading="lazy" className="aspect-square w-full rounded-full object-cover" />
            <p className="mt-2 text-sm">{s.title}</p>
          </Link>
        ))}
      </div>
    </PageShell>
  ),
});
