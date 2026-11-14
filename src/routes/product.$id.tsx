import { createFileRoute, notFound, useNavigate } from "@tanstack/react-router";
import { Heart, Share2, ShoppingCart, BadgeCheck, Truck, RotateCcw, ShieldCheck, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { PageShell } from "@/components/parqis/PageShell";
import { ProductCard } from "@/components/parqis/ProductCard";
import { allProducts, formatPrice, productId } from "@/lib/store";
import { useShop } from "@/lib/cart";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const p = allProducts.find((x) => productId(x) === params.id);
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? "Product"} - PARQIS` },
      { name: "description", content: `Buy ${loaderData?.name ?? "fashion"} on PARQIS at best price.` },
      { property: "og:title", content: `${loaderData?.name ?? "Product"} - PARQIS` },
      { property: "og:description", content: "Buy on PARQIS." },
      ...(loaderData ? [{ property: "og:image", content: loaderData.img }, { name: "twitter:image", content: loaderData.img }] : []),
    ],
  }),
  component: ProductPage,
});

function ProductPage() {
  const p = Route.useLoaderData();
  const { add, toggleWish, isWished } = useShop();
  const nav = useNavigate();
  const wished = isWished(p);

  const share = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: p.name, url: location.href });
      } else {
        await navigator.clipboard.writeText(location.href);
        toast.success("Link copied to clipboard");
      }
    } catch {
      /* cancelled */
    }
  };

  // Find similar products
  const similar = allProducts
    .filter((x) => productId(x) !== productId(p))
    .slice(0, 6);

  return (
    <PageShell title={p.name}>
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Image with sticky positioning on desktop */}
          <div className="lg:col-span-6 xl:col-span-5">
            <div className="md:sticky md:top-24">
              <div className="relative overflow-hidden rounded-2xl bg-muted shadow-sm">
                <img
                  src={p.img}
                  alt={p.name}
                  className="aspect-[17/20] w-full max-h-[560px] object-cover object-top"
                />

                {p.off > 0 && (
                  <span className="absolute left-3 top-3 rounded-md bg-primary px-2.5 py-1 text-xs font-bold text-primary-foreground shadow">
                    {p.off}% OFF
                  </span>
                )}

                <div className="absolute bottom-4 right-4 flex flex-col gap-2.5">
                  <button
                    aria-label="Wishlist"
                    onClick={() => {
                      toggleWish(p);
                      toast.success(wished ? "Removed from wishlist" : "Added to wishlist");
                    }}
                    className="grid size-11 place-items-center rounded-full bg-background/80 text-primary shadow backdrop-blur transition hover:bg-background hover:scale-105"
                  >
                    <Heart className={`size-5 ${wished ? "fill-primary" : ""}`} />
                  </button>
                  <button
                    aria-label="Share"
                    onClick={share}
                    className="grid size-11 place-items-center rounded-full bg-background/80 text-foreground shadow backdrop-blur transition hover:bg-background hover:scale-105"
                  >
                    <Share2 className="size-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Product Info & Actions */}
          <div className="flex flex-col space-y-6 lg:col-span-6 xl:col-span-7">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-primary">
                <Sparkles className="size-3.5" />
                <span>PARQIS Verified Official</span>
                <BadgeCheck className="size-4 text-primary fill-primary/20" />
              </div>
              <h1 className="mt-2 text-xl font-bold tracking-tight text-foreground sm:text-2xl md:text-3xl">
                {p.name}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">{p.variant}</p>
            </div>

            {/* Price Box */}
            <div className="rounded-xl border border-border/70 bg-card p-4 shadow-sm">
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="text-3xl font-extrabold text-foreground">
                  {formatPrice(p.price)}
                </span>
                {p.mrp > p.price && (
                  <span className="text-base text-muted-foreground line-through">
                    {formatPrice(p.mrp)}
                  </span>
                )}
                <span className="rounded-full bg-success/15 px-2.5 py-0.5 text-xs font-bold text-success">
                  Save {formatPrice(p.mrp - p.price)} ({p.off}% OFF)
                </span>
              </div>
              <p className="mt-1.5 text-xs text-muted-foreground">
                Inclusive of all taxes · Free delivery on all orders
              </p>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => {
                  add(p);
                  nav({ to: "/cart" });
                }}
                className="flex items-center justify-center rounded-xl bg-primary py-3.5 px-6 font-semibold text-primary-foreground shadow transition hover:bg-primary/90 hover:shadow-md"
              >
                Buy Now for {formatPrice(p.price)}
              </button>
              <button
                onClick={() => {
                  add(p);
                  toast.success("Added to cart");
                }}
                className="flex items-center justify-center gap-2 rounded-xl border border-foreground/30 bg-background py-3.5 px-6 font-semibold text-foreground transition hover:bg-muted"
              >
                <ShoppingCart className="size-5" />
                Add to Cart
              </button>
            </div>

            {/* Service & Trust Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 rounded-xl border border-border/60 bg-muted/20 p-4">
              <div className="flex items-center gap-3">
                <div className="grid size-9 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                  <Truck className="size-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold">Free Express Shipping</p>
                  <p className="text-[11px] text-muted-foreground">Delivery in 2-4 business days</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="grid size-9 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                  <RotateCcw className="size-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold">7 Days Easy Return</p>
                  <p className="text-[11px] text-muted-foreground">Hassle-free doorstep pickup</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="grid size-9 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                  <ShieldCheck className="size-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold">100% Genuine</p>
                  <p className="text-[11px] text-muted-foreground">Quality checked & verified</p>
                </div>
              </div>
            </div>

            {/* Product Details Overview */}
            <div className="space-y-3 rounded-xl border border-border/60 p-4">
              <h3 className="font-semibold text-sm">Product Specifications</h3>
              <div className="grid grid-cols-2 gap-y-2 text-xs">
                <span className="text-muted-foreground">Brand</span>
                <span className="font-medium text-foreground">PARQIS Collection</span>
                <span className="text-muted-foreground">Style Category</span>
                <span className="font-medium text-foreground">{p.variant || "Casual & Festive"}</span>
                <span className="text-muted-foreground">Fit</span>
                <span className="font-medium text-foreground">Regular Comfort Fit</span>
                <span className="text-muted-foreground">Care</span>
                <span className="font-medium text-foreground">Machine wash / Dry clean</span>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products Recommendation */}
        {similar.length > 0 && (
          <div className="mt-16 border-t pt-8">
            <h2 className="mb-6 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              Similar Styles You May Like
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-6">
              {similar.map((s) => (
                <ProductCard key={s.img} p={s} />
              ))}
            </div>
          </div>
        )}
      </div>
    </PageShell>
  );
}
