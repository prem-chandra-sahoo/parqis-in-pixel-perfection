import { createFileRoute, notFound, useNavigate } from "@tanstack/react-router";
import { Heart, Share2, ShoppingCart, BadgeCheck } from "lucide-react";
import { toast } from "sonner";
import { PageShell } from "@/components/parqis/PageShell";
import { allProducts, formatPrice, productId } from "@/lib/store";
import { useShop } from "@/lib/cart";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const p = allProducts.find((x) => productId(x) === params.id);
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData }) => ({ meta: [{ title: `${loaderData?.name ?? "Product"} - PARQIS` }, { name: "description", content: "Buy on PARQIS." }, { property: "og:title", content: `${loaderData?.name ?? "Product"} - PARQIS` }, { property: "og:description", content: "Buy on PARQIS." }, ...(loaderData ? [{ property: "og:image", content: loaderData.img }, { name: "twitter:image", content: loaderData.img }] : [])] }),
  component: ProductPage,
});

function ProductPage() {
  const p = Route.useLoaderData();
  const { add, toggleWish, isWished } = useShop();
  const nav = useNavigate();
  const share = async () => {
    try { if (navigator.share) await navigator.share({ title: p.name, url: location.href }); else { await navigator.clipboard.writeText(location.href); toast.success("Link copied"); } } catch { /* cancelled */ }
  };
  return (
    <PageShell title={p.name}>
      <div className="grid gap-6 p-4 sm:px-6 md:grid-cols-2">
        <div className="relative"><img src={p.img} alt={p.name} className="w-full rounded-md object-cover" />
          <div className="absolute bottom-4 right-4 flex flex-col gap-3">
            <button aria-label="Wishlist" onClick={() => toggleWish(p)} className="grid size-12 place-items-center rounded-full bg-background/70 text-primary backdrop-blur"><Heart className={`size-6 ${isWished(p) ? "fill-primary" : ""}`} /></button>
            <button aria-label="Share" onClick={share} className="grid size-12 place-items-center rounded-full bg-background/70 text-primary backdrop-blur"><Share2 className="size-6" /></button>
          </div>
        </div>
        <div>
          <p className="flex items-center gap-1 font-medium">PARQIS <BadgeCheck className="size-4 text-primary" /></p>
          <h2 className="mt-2 text-2xl font-semibold">{p.name}</h2>
          <p className="text-muted-foreground">{p.variant}</p>
          <div className="mt-3 flex items-baseline gap-3"><span className="text-2xl font-bold">{formatPrice(p.price)}</span><span className="text-muted-foreground line-through">{formatPrice(p.mrp)}</span><span className="font-semibold text-success">{p.off}% OFF</span></div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <button onClick={() => { add(p); nav({ to: "/cart" }); }} className="rounded-md bg-primary py-3 font-medium text-primary-foreground hover:bg-primary/90">Buy Now @{p.price}</button>
            <button onClick={() => { add(p); toast.success("Added to cart"); }} className="flex items-center justify-center gap-2 rounded-md border border-foreground py-3 font-medium hover:bg-muted"><ShoppingCart className="size-5" />Add to Cart</button>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
