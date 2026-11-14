import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { User, Package, LogOut, LogIn, ExternalLink, Mail, Heart, MapPin } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useShop } from "@/lib/cart";
import { formatPrice } from "@/lib/store";
import { PageShell } from "@/components/parqis/PageShell";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "My Account - PARQIS" },
      { name: "description", content: "Your PARQIS profile and orders." },
      { property: "og:title", content: "My Account - PARQIS" },
      { property: "og:description", content: "Your PARQIS profile and orders." },
    ],
  }),
  component: Account,
});

function Account() {
  const { session, authReady, address, wishlist } = useShop();
  const nav = useNavigate();
  const uid = session?.user.id;

  const profile = useQuery({
    queryKey: ["profile", uid],
    enabled: !!uid,
    queryFn: async () => (await supabase.from("profiles").select("*").eq("id", uid!).maybeSingle()).data,
  });

  const orders = useQuery({
    queryKey: ["orders", uid],
    enabled: !!uid,
    queryFn: async () =>
      (await supabase.from("orders").select("*").order("created_at", { ascending: false })).data ?? [],
  });

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out successfully");
  };

  return (
    <PageShell title="My Account">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-4xl space-y-6">
          {/* User Profile Card */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-border/80 bg-card p-5 sm:p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="grid size-16 sm:size-20 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground shadow">
                <User className="size-8 sm:size-10 fill-current" />
              </div>
              <div className="min-w-0">
                {session ? (
                  <>
                    <h2 className="truncate text-lg sm:text-xl font-bold text-foreground">
                      {profile.data?.name || "PARQIS Member"}
                    </h2>
                    <p className="truncate text-xs sm:text-sm text-muted-foreground">{session.user.email}</p>
                    <span className="mt-1 inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                      Verified Account
                    </span>
                  </>
                ) : (
                  <>
                    <h2 className="text-lg sm:text-xl font-bold text-foreground">Guest User</h2>
                    <p className="text-xs sm:text-sm text-muted-foreground">Sign in to track orders and save addresses</p>
                    <Link
                      to="/login"
                      className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                    >
                      Sign in or create account →
                    </Link>
                  </>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-2 sm:pt-0">
              {session ? (
                <button
                  onClick={handleSignOut}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-input px-4 py-2 text-xs font-semibold text-foreground transition hover:bg-muted"
                >
                  <LogOut className="size-3.5" /> Sign out
                </button>
              ) : (
                <button
                  onClick={() => nav({ to: "/login" })}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow transition hover:bg-primary/90"
                >
                  <LogIn className="size-3.5" /> Sign In
                </button>
              )}
              <a
                href="mailto:support@parqis.com"
                className="inline-flex items-center gap-1.5 rounded-xl border border-input px-4 py-2 text-xs font-semibold text-foreground transition hover:bg-muted"
              >
                <Mail className="size-3.5" /> Support
              </a>
              <a
                href="https://parqis.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-input px-4 py-2 text-xs font-semibold text-foreground transition hover:bg-muted"
              >
                <ExternalLink className="size-3.5" /> Parqis.com
              </a>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <Link
              to="/wishlist"
              className="flex items-center gap-3 rounded-xl border border-border/70 bg-card p-4 transition hover:border-primary/40 shadow-sm"
            >
              <div className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary">
                <Heart className="size-5" />
              </div>
              <div>
                <p className="text-base font-bold text-foreground">{wishlist.length}</p>
                <p className="text-xs text-muted-foreground">Saved Items</p>
              </div>
            </Link>

            <div className="flex items-center gap-3 rounded-xl border border-border/70 bg-card p-4 shadow-sm">
              <div className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary">
                <Package className="size-5" />
              </div>
              <div>
                <p className="text-base font-bold text-foreground">{orders.data?.length ?? 0}</p>
                <p className="text-xs text-muted-foreground">Total Orders</p>
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1 flex items-center gap-3 rounded-xl border border-border/70 bg-card p-4 shadow-sm">
              <div className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary">
                <MapPin className="size-5" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-xs font-semibold text-foreground">
                  {address ? "Saved Address" : "Default Address"}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {address || "None selected"}
                </p>
              </div>
            </div>
          </div>

          {/* Orders Section */}
          <div className="rounded-2xl border border-border/80 bg-card p-5 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-border/70 pb-4">
              <h3 className="text-base sm:text-lg font-bold text-foreground">Order History</h3>
              <span className="text-xs text-muted-foreground">
                {orders.data?.length ?? 0} {orders.data?.length === 1 ? "order" : "orders"}
              </span>
            </div>

            {!authReady ? (
              <div className="py-12 text-center text-sm text-muted-foreground">Loading orders...</div>
            ) : !session ? (
              <div className="py-12 text-center">
                <p className="text-base font-semibold text-foreground">Sign in to view your orders</p>
                <p className="mt-1 text-xs text-muted-foreground">Your past purchases will appear here</p>
                <Link
                  to="/login"
                  className="mt-4 inline-flex items-center rounded-xl bg-primary px-5 py-2 text-xs font-semibold text-primary-foreground transition hover:bg-primary/90"
                >
                  Sign In Now
                </Link>
              </div>
            ) : !orders.data?.length ? (
              <div className="py-12 text-center">
                <p className="text-base font-semibold text-foreground">No orders yet</p>
                <p className="mt-1 text-xs text-muted-foreground">When you make an order, it will appear here</p>
                <Link
                  to="/"
                  className="mt-4 inline-flex items-center rounded-xl bg-primary px-5 py-2 text-xs font-semibold text-primary-foreground transition hover:bg-primary/90"
                >
                  Browse Collections
                </Link>
              </div>
            ) : (
              <div className="mt-4 divide-y divide-border/60">
                {orders.data.map((o) => (
                  <div key={o.id} className="py-4 first:pt-0 last:pb-0">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-foreground">
                          Order #{o.id.slice(0, 8)}
                        </span>
                        <span className="rounded-full bg-success/15 px-2.5 py-0.5 text-[11px] font-bold text-success">
                          {o.status}
                        </span>
                      </div>
                      <span className="text-sm font-bold text-foreground">
                        {formatPrice(Number(o.total))}
                      </span>
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                      <span>{new Date(o.created_at).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}</span>
                      <span>·</span>
                      <span>{(o.items as unknown[]).length} {(o.items as unknown[]).length === 1 ? "item" : "items"}</span>
                      <span>·</span>
                      <span className="truncate max-w-xs sm:max-w-md">Deliver to: {o.address}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
