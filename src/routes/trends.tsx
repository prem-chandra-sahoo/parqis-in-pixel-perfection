import { createFileRoute, Link } from "@tanstack/react-router";
import { Play, Sparkles, Heart } from "lucide-react";
import { PageShell } from "@/components/parqis/PageShell";
import { allProducts, formatPrice, productId } from "@/lib/store";
import { useShop } from "@/lib/cart";
import { toast } from "sonner";

export const Route = createFileRoute("/trends")({
  head: () => ({
    meta: [
      { title: "Trends & Creator Looks - PARQIS" },
      { name: "description", content: "Discover trending festive fashion and creator looks on PARQIS." },
      { property: "og:title", content: "Trends & Creator Looks - PARQIS" },
      { property: "og:description", content: "Discover trending festive fashion and creator looks on PARQIS." },
    ],
  }),
  component: TrendsPage,
});

function TrendsPage() {
  const { toggleWish, isWished } = useShop();
  const trending = allProducts.filter((_, i) => i % 2 === 0).slice(0, 20);

  return (
    <PageShell title="Trends">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              <Sparkles className="size-3.5" />
              <span>Creator Showcase</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">Trending Looks</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Watch real styles in motion and tap to shop the exact outfit
            </p>
          </div>
          <span className="text-xs font-semibold text-muted-foreground">
            {trending.length} Trending Outfits
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 xs:gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {trending.map((p, idx) => {
            const wished = isWished(p);
            return (
              <div
                key={p.img}
                className="group relative overflow-hidden rounded-2xl bg-muted shadow-sm transition-all duration-300 hover:shadow-md"
              >
                <Link
                  to="/product/$id"
                  params={{ id: productId(p) }}
                  className="block overflow-hidden"
                >
                  <img
                    src={p.img}
                    alt={p.name}
                    loading="lazy"
                    className="aspect-[9/14] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>

                {/* Floating Play Badge */}
                <div className="pointer-events-none absolute left-3 top-3 flex items-center gap-1 rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm">
                  <Play className="size-2.5 fill-current" />
                  <span>{((idx + 3) * 1.8).toFixed(1)}k</span>
                </div>

                {/* Wishlist Button */}
                <button
                  aria-label="Wishlist"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleWish(p);
                    toast.success(wished ? "Removed from wishlist" : "Added to wishlist");
                  }}
                  className="absolute right-3 top-3 grid size-8 place-items-center rounded-full bg-background/80 text-foreground shadow backdrop-blur transition hover:bg-background hover:scale-110"
                >
                  <Heart className={`size-3.5 ${wished ? "fill-primary text-primary" : ""}`} />
                </button>

                {/* Bottom Overlay Card */}
                <Link
                  to="/product/$id"
                  params={{ id: productId(p) }}
                  className="absolute inset-x-2 bottom-2 block rounded-xl bg-background/90 p-2.5 shadow-lg backdrop-blur-md transition-colors hover:bg-background sm:p-3"
                >
                  <p className="truncate text-xs sm:text-sm font-semibold text-foreground">
                    {p.name}
                  </p>
                  <div className="mt-1 flex items-baseline justify-between gap-1">
                    <span className="text-xs sm:text-sm font-bold text-foreground">
                      {formatPrice(p.price)}
                    </span>
                    {p.off > 0 && (
                      <span className="text-[11px] font-bold text-success">
                        {p.off}% OFF
                      </span>
                    )}
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </PageShell>
  );
}
