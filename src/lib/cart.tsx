import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { productId, type Product } from "./store";

type Line = { product: Product; qty: number };
type Ctx = {
  cart: Line[]; wishlist: Product[]; address: string | null;
  add: (p: Product) => void; setQty: (id: string, q: number) => void;
  toggleWish: (p: Product) => void; isWished: (p: Product) => boolean;
  setAddress: (a: string | null) => void; count: number;
};
const C = createContext<Ctx | null>(null);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Line[]>([]);
  const [wishlist, setWish] = useState<Product[]>([]);
  const [address, setAddress] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem("parqis") || "{}");
      setCart(s.cart || []); setWish(s.wishlist || []); setAddress(s.address || null);
    } catch { /* ignore */ }
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready) localStorage.setItem("parqis", JSON.stringify({ cart, wishlist, address }));
  }, [cart, wishlist, address, ready]);

  const value: Ctx = {
    cart, wishlist, address, setAddress,
    count: cart.reduce((a, l) => a + l.qty, 0),
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
