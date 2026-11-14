import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FestiveHeader } from "@/components/parqis/FestiveHeader";
import { BannerCarousel } from "@/components/parqis/BannerCarousel";
import { ProductRow } from "@/components/parqis/ProductRow";
import { matchesTab, sections, type Tab } from "@/lib/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Online Shopping & Entertainment - PARQIS" },
      { name: "description", content: "Shop festive, ethnic and western fashion at up to 70% off on PARQIS." },
      { property: "og:title", content: "Online Shopping & Entertainment - PARQIS" },
      { property: "og:description", content: "Shop festive, ethnic and western fashion at up to 70% off on PARQIS." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  const [tab, setTab] = useState<Tab>("ALL");

  return (
    <div className="min-h-screen bg-background pb-12 sm:pb-16">
      <FestiveHeader tab={tab} onTab={setTab} />
      <BannerCarousel />
      <div className="mt-4 sm:mt-6">
        {sections.map((s, i) =>
          s.kind === "row" ? (
            <ProductRow
              key={s.title}
              title={s.title}
              products={s.products.filter((p) => matchesTab(p, tab))}
            />
          ) : tab === "ALL" ? (
            <div key={i} className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
              <img
                src={s.img}
                alt="Offer banner"
                loading="lazy"
                className="w-full rounded-xl shadow-sm object-cover max-h-[380px]"
              />
            </div>
          ) : null,
        )}
      </div>
    </div>
  );
}
