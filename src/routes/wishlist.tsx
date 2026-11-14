import { createFileRoute } from "@tanstack/react-router";
import { ProductCard } from "@/components/parqis/ProductCard";
import { Grid, PageShell } from "@/components/parqis/PageShell";
import { useShop } from "@/lib/cart";

export const Route = createFileRoute("/wishlist")({
  head: () => ({ meta: [{ title: "Wishlist - PARQIS" }, { name: "description", content: "Your saved PARQIS items." }, { property: "og:title", content: "Wishlist - PARQIS" }, { property: "og:description", content: "Your saved PARQIS items." }] }),
  component: () => {
    const { wishlist } = useShop();
    return <PageShell title="Wishlist">{!wishlist.length && <p className="p-10 text-center text-muted-foreground">No items in your wishlist yet. Tap the heart on any product.</p>}<Grid>{wishlist.map((p) => <ProductCard key={p.img} p={p} />)}</Grid></PageShell>;
  },
});
