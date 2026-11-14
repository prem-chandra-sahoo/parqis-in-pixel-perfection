import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import { PageShell } from "@/components/parqis/PageShell";
import { formatPrice, productId } from "@/lib/store";
import { useShop } from "@/lib/cart";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Cart - PARQIS" }, { name: "description", content: "Your PARQIS cart." }, { property: "og:title", content: "Cart - PARQIS" }, { property: "og:description", content: "Your PARQIS cart." }] }),
  component: CartPage,
});

function CartPage() {
  const { cart, setQty, address, session, clearCart } = useShop();
  const nav = useNavigate();
  const [busy, setBusy] = useState(false);
  const place = async () => {
    if (!session) { toast("Please sign in to place your order"); return nav({ to: "/login" }); }
    if (!address) { toast.error("Please select a delivery address on the home page first"); return; }
    setBusy(true);
    const { error } = await supabase.from("orders").insert({ user_id: session.user.id, items: cart as never, total, address });
    setBusy(false);
    if (error) { toast.error("Couldn't place order"); return; }
    clearCart(); toast.success("Order placed!"); nav({ to: "/account" });
  };
  const total = cart.reduce((a, l) => a + l.product.price * l.qty, 0);
  const mrp = cart.reduce((a, l) => a + l.product.mrp * l.qty, 0);
  return (
    <PageShell title="Cart">
      {!cart.length ? (
        <div className="p-10 text-center"><p className="text-lg">Your cart is empty.</p><Link to="/" className="mt-4 inline-block rounded-md bg-primary px-6 py-2.5 text-primary-foreground">Start shopping</Link></div>
      ) : (
        <div className="space-y-3 p-4 sm:px-6">
          {cart.map(({ product: p, qty }) => (
            <div key={p.img} className="flex gap-3 rounded-md border p-3">
              <img src={p.img} alt={p.name} className="h-28 w-24 rounded object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{p.name}</p><p className="text-sm text-muted-foreground">{p.variant}</p>
                <p className="mt-1 font-semibold">{formatPrice(p.price)} <span className="text-sm font-normal text-muted-foreground line-through">{formatPrice(p.mrp)}</span></p>
                <div className="mt-2 inline-flex items-center gap-3 rounded border px-2 py-1">
                  <button aria-label="Decrease" onClick={() => setQty(productId(p), qty - 1)}><Minus className="size-4" /></button>{qty}
                  <button aria-label="Increase" onClick={() => setQty(productId(p), qty + 1)}><Plus className="size-4" /></button>
                </div>
              </div>
            </div>
          ))}
          <div className="rounded-md border p-4">
            <div className="flex justify-between"><span>Total MRP</span><span>{formatPrice(mrp)}</span></div>
            <div className="flex justify-between text-success"><span>Discount</span><span>-{formatPrice(mrp - total)}</span></div>
            <div className="mt-2 flex justify-between text-lg font-semibold"><span>Total</span><span>{formatPrice(total)}</span></div>
            <button onClick={place} disabled={busy} className="mt-4 disabled:opacity-60 w-full rounded-md bg-primary py-3 text-primary-foreground">Place Order</button>
          </div>
        </div>
      )}
    </PageShell>
  );
}
