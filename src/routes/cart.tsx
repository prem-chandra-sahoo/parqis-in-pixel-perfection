import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Minus, Plus, Trash2, MapPin, ShieldCheck, ShoppingBag, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { PageShell } from "@/components/parqis/PageShell";
import { formatPrice, productId } from "@/lib/store";
import { useShop } from "@/lib/cart";
import { AddressSheet } from "@/components/parqis/AddressSheet";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Cart - PARQIS" },
      { name: "description", content: "Your PARQIS shopping cart." },
      { property: "og:title", content: "Cart - PARQIS" },
      { property: "og:description", content: "Your PARQIS shopping cart." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { cart, setQty, address, session, clearCart } = useShop();
  const nav = useNavigate();
  const [busy, setBusy] = useState(false);
  const [addressOpen, setAddressOpen] = useState(false);

  const total = cart.reduce((a, l) => a + l.product.price * l.qty, 0);
  const mrp = cart.reduce((a, l) => a + l.product.mrp * l.qty, 0);
  const savings = mrp - total;

  const place = async () => {
    if (!session) {
      toast("Please sign in to place your order");
      return nav({ to: "/login" });
    }
    if (!address) {
      toast.error("Please set a delivery address first");
      setAddressOpen(true);
      return;
    }
    setBusy(true);
    const { error } = await supabase.from("orders").insert({
      user_id: session.user.id,
      items: cart as never,
      total,
      address,
    });
    setBusy(false);
    if (error) {
      toast.error("Couldn't place order: " + error.message);
      return;
    }
    clearCart();
    toast.success("Order placed successfully!");
    nav({ to: "/account" });
  };

  return (
    <PageShell title="Shopping Cart">
      <div className="p-4 sm:p-6 lg:p-8">
        {!cart.length ? (
          <div className="mx-auto max-w-md py-16 text-center">
            <div className="mx-auto mb-4 grid size-20 place-items-center rounded-full bg-muted text-muted-foreground">
              <ShoppingBag className="size-10" />
            </div>
            <h2 className="text-xl font-bold text-foreground">Your shopping cart is empty</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Explore our latest festive and western collections and add your favorites to cart.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow transition hover:bg-primary/90"
              >
                Start Shopping <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/wishlist"
                className="inline-flex items-center rounded-xl border border-input px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-muted"
              >
                View Wishlist
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
            {/* Left 7-8 Columns: Address Banner + Cart Items */}
            <div className="space-y-4 lg:col-span-7 xl:col-span-8">
              {/* Delivery Address Card */}
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border/80 bg-card p-4 shadow-sm">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="grid size-9 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                    <MapPin className="size-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Delivery Address
                    </p>
                    <p className="truncate text-sm font-medium text-foreground">
                      {address || "No address selected yet"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setAddressOpen(true)}
                  className="rounded-lg border border-primary/30 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary transition hover:bg-primary/10"
                >
                  {address ? "Change" : "Add Address"}
                </button>
              </div>

              {/* Items List */}
              <div className="space-y-3">
                {cart.map(({ product: p, qty }) => (
                  <div
                    key={p.img}
                    className="flex gap-4 rounded-xl border border-border/70 bg-card p-3 sm:p-4 shadow-sm transition hover:border-border"
                  >
                    <Link
                      to="/product/$id"
                      params={{ id: productId(p) }}
                      className="shrink-0 overflow-hidden rounded-lg bg-muted"
                    >
                      <img
                        src={p.img}
                        alt={p.name}
                        className="h-28 w-24 sm:h-32 sm:w-28 rounded-lg object-cover"
                      />
                    </Link>

                    <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            to="/product/$id"
                            params={{ id: productId(p) }}
                            className="truncate text-sm sm:text-base font-semibold text-foreground hover:text-primary transition-colors"
                          >
                            {p.name}
                          </Link>
                          <button
                            aria-label="Remove item"
                            onClick={() => setQty(productId(p), 0)}
                            className="rounded p-1 text-muted-foreground transition hover:bg-muted hover:text-destructive"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                        <p className="text-xs text-muted-foreground">{p.variant}</p>
                        <div className="mt-2 flex flex-wrap items-baseline gap-2">
                          <span className="text-base font-bold text-foreground sm:text-lg">
                            {formatPrice(p.price)}
                          </span>
                          {p.mrp > p.price && (
                            <span className="text-xs text-muted-foreground line-through">
                              {formatPrice(p.mrp)}
                            </span>
                          )}
                          {p.off > 0 && (
                            <span className="text-xs font-semibold text-success">
                              {p.off}% OFF
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Quantity Selector */}
                      <div className="mt-3 flex items-center justify-between">
                        <div className="inline-flex items-center gap-3 rounded-lg border border-border bg-background px-3 py-1 shadow-sm">
                          <button
                            aria-label="Decrease quantity"
                            onClick={() => setQty(productId(p), qty - 1)}
                            className="text-muted-foreground transition hover:text-foreground"
                          >
                            <Minus className="size-3.5" />
                          </button>
                          <span className="text-xs sm:text-sm font-semibold">{qty}</span>
                          <button
                            aria-label="Increase quantity"
                            onClick={() => setQty(productId(p), qty + 1)}
                            className="text-muted-foreground transition hover:text-foreground"
                          >
                            <Plus className="size-3.5" />
                          </button>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          Subtotal: <strong className="text-foreground">{formatPrice(p.price * qty)}</strong>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Security info */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2">
                <ShieldCheck className="size-4 text-success" />
                <span>Safe and secure payments · 100% genuine products guaranteed</span>
              </div>
            </div>

            {/* Right 4-5 Columns: Sticky Order Summary */}
            <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24">
              <div className="rounded-xl border border-border/80 bg-card p-5 shadow-sm">
                <h3 className="text-base font-bold text-foreground">Order Summary</h3>

                <div className="mt-4 space-y-2.5 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Total MRP ({cart.reduce((a, b) => a + b.qty, 0)} items)</span>
                    <span className="text-foreground">{formatPrice(mrp)}</span>
                  </div>
                  <div className="flex justify-between text-success">
                    <span>Discount on MRP</span>
                    <span>-{formatPrice(savings)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Delivery Fee</span>
                    <span className="font-medium text-success">FREE</span>
                  </div>
                  <div className="border-t border-border/80 pt-3">
                    <div className="flex justify-between text-base sm:text-lg font-bold text-foreground">
                      <span>Total Amount</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                    {savings > 0 && (
                      <p className="mt-1 text-xs font-medium text-success">
                        You will save {formatPrice(savings)} on this order
                      </p>
                    )}
                  </div>
                </div>

                <button
                  onClick={place}
                  disabled={busy}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground shadow transition hover:bg-primary/90 disabled:opacity-60"
                >
                  {busy ? "Placing Order..." : `Proceed to Buy · ${formatPrice(total)}`}
                </button>

                <p className="mt-3 text-center text-[11px] text-muted-foreground">
                  By placing your order, you agree to PARQIS terms and conditions.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <AddressSheet open={addressOpen} onOpenChange={setAddressOpen} />
    </PageShell>
  );
}
