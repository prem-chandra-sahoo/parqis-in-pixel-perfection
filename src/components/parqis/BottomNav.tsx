import { Link, useLocation } from "@tanstack/react-router";
import { Home, CirclePlay, LayoutGrid, ShoppingCart } from "lucide-react";
import { useShop } from "@/lib/cart";

const items = [
  { to: "/", label: "Home", Icon: Home },
  { to: "/trends", label: "Trends", Icon: CirclePlay },
  { to: "/categories", label: "Categories", Icon: LayoutGrid },
  { to: "/cart", label: "Cart", Icon: ShoppingCart },
] as const;

export function BottomNav() {
  const { pathname } = useLocation();
  const { count } = useShop();
  return (
    <nav className="fixed inset-x-0 bottom-3 z-40 mx-auto w-[calc(100%-1.5rem)] max-w-md rounded-full border border-border/60 bg-background/80 p-1.5 shadow-lg backdrop-blur-md md:hidden">
      <ul className="grid grid-cols-4">
        {items.map(({ to, label, Icon }) => {
          const active = pathname === to;
          return (
            <li key={to}>
              <Link to={to} className={`relative mx-auto flex flex-col items-center rounded-full py-1.5 text-xs ${active ? "bg-muted text-primary shadow-sm" : "text-foreground"}`}>
                <Icon className="size-5" />{label}
                {to === "/cart" && count > 0 && <span className="absolute right-[22%] top-0 grid size-4 place-items-center rounded-full bg-primary text-[10px] text-primary-foreground">{count}</span>}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
