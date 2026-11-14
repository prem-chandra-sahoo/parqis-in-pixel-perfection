import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { productId, type Product } from "./store";

type Line = { product: Product; qty: number };
type Ctx = {
  session: Session | null; authReady: boolean;
  cart: Line[]; wishlist: Product[]; address: string | null;
  add: (p: Product) => void; setQty: (id: string, q: number) => void; clearCart: () => void;
  toggleWish: (p: Product) => void; isWished: (p: Product) => boolean;
  setAddress: (a: string | null) => void; count: number;
};
const C = createContext<Ctx | null>(null);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Line[]>([]);
  const [wishlist, setWish] = useState<Product[]>([]);
  const [address, setAddress] = useState<string | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const loaded = useRef<string | null>(null); // "guest" or user id whose data is loaded

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); setAuthReady(true); });
    return () => data.subscription.unsubscribe();
  }, []);

  // Load state: guest from browser, signed-in from the database (merging any guest cart).
  useEffect(() => {
    if (!authReady) return;
    const uid = session?.user.id;
    let local: { cart?: Line[]; wishlist?: Product[]; address?: string } = {};
    try { local = JSON.parse(localStorage.getItem("parqis") || "{}"); } catch { /* ignore */ }
    if (!uid) {
      setCart(local.cart || []); setWish(local.wishlist || []); setAddress(local.address || null);
      loaded.current = "guest"; return;
    }
    loaded.current = null;
    (async () => {
      const { data } = await supabase.from("shop_state").select("cart, wishlist").eq("user_id", uid).maybeSingle();
      const dbCart = (data?.cart as Line[] | undefined) ?? [];
      const dbWish = (data?.wishlist as Product[] | undefined) ?? [];
      const mergedCart = [...dbCart];
      (local.cart || []).forEach((l) => { if (!mergedCart.some((m) => productId(m.product) === productId(l.product))) mergedCart.push(l); });
      const mergedWish = [...dbWish];
      (local.wishlist || []).forEach((p) => { if (!mergedWish.some((m) => productId(m) === productId(p))) mergedWish.push(p); });
      localStorage.removeItem("parqis");
      const { data: addr } = await supabase.from("addresses").select("label").order("created_at", { ascending: false }).limit(1);
      setCart(mergedCart); setWish(mergedWish); setAddress(addr?.[0]?.label ?? local.address ?? null);
      loaded.current = uid;
    })();
  }, [session?.user.id, authReady]);

  // Persist.
  useEffect(() => {
    const who = loaded.current;
    if (!who) return;
    if (who === "guest") { localStorage.setItem("parqis", JSON.stringify({ cart, wishlist, address })); return; }
    const t = setTimeout(() => {
      supabase.from("shop_state").upsert({ user_id: who, cart: cart as never, wishlist: wishlist as never, updated_at: new Date().toISOString() }).then();
    }, 400);
    return () => clearTimeout(t);
  }, [cart, wishlist, address]);

  const value: Ctx = {
    session, authReady, cart, wishlist, address,
    setAddress: (a) => {
      setAddress(a);
      if (a && session) supabase.from("addresses").insert({ label: a, user_id: session.user.id }).then();
    },
    count: cart.reduce((a, l) => a + l.qty, 0),
    clearCart: () => setCart([]),
    add: (p) => setCart((c) => {
      const id = productId(p); const f = c.find((l) => productId(l.product) === id);
      return f ? c.map((l) => (l === f ? { ...l, qty: l.qty + 1 } : l)) : [...c, { product: p, qty: 1 }];
    }),
    setQty: (id, q) => setCart((c) => q <= 0 ? c.filter((l) => productId(l.product) !== id) : c.map((l) => productId(l.product) === id ? { ...l, qty: q } : l)),
    toggleWish: (p) => setWish((w) => w.some((x) => productId(x) === productId(p)) ? w.filter((x) => productId(x) !== productId(p)) : [...w, p]),
    isWished: (p) => wishlist.some((x) => productId(x) === productId(p)),
  };
  return <C.Provider value={value}>{children}</C.Provider>;
}
export const useShop = () => { const c = useContext(C); if (!c) throw new Error("no ShopProvider"); return c; };
