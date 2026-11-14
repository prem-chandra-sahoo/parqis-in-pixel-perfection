import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, ShoppingBag, ShoppingCart } from "lucide-react";
import { ProductCard } from "@/components/parqis/ProductCard";
import { Grid, PageShell } from "@/components/parqis/PageShell";
import { useShop } from "@/lib/cart";
import { toast } from "sonner";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Wishlist - PARQIS" },
      { name: "description", content: "Your saved favorites on PARQIS." },
      { property: "og:title", content: "Wishlist - PARQIS" },
      { property: "og:description", content: "Your saved favorites on PARQIS." },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const { wishlist, add } = useShop();

  const handleAddAllToCart = () => {
    wishlist.forEach((p) => add(p));
    toast.success(`Added ${wishlist.length} items to cart`);
  };

  return (
    <PageShell title="Saved Items">
      <div className="p-4 sm:p-6 lg:p-8">
        {!wishlist.length ? (
          <div className="mx-auto max-w-md py-16 text-center">
            <div className="mx-auto mb-4 grid size-20 place-items-center rounded-full bg-muted text-muted-foreground">
              <Heart className="size-10" />
            </div>
            <h2 className="text-xl font-bold text-foreground">Your wishlist is empty</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Explore our trending edits and tap the heart icon on any product to save it here.
            </p>
            <div className="mt-6 flex justify-center">
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow transition hover:bg-primary/90"
              >
                <ShoppingBag className="size-4" /> Start Browsing
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-foreground">My Wishlist</h2>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {wishlist.length} {wishlist.length === 1 ? "item" : "items"} saved for later
                </p>
              </div>

              <button
                onClick={handleAddAllToCart}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow transition hover:bg-primary/90"
              >
                <ShoppingCart className="size-4" /> Move all to cart
              </button>
            </div>

            <Grid>
              {wishlist.map((p) => (
                <ProductCard key={p.img} p={p} />
              ))}
            </Grid>
          </div>
        )}
      </div>
    </PageShell>
  );
}
