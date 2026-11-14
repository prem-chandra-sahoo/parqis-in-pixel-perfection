import { Link } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { formatPrice, productId, type Product } from "@/lib/store";
import { useShop } from "@/lib/cart";

export function ProductCard({ p, className = "" }: { p: Product; className?: string }) {
  const { add } = useShop();
  return (
    <div className={`min-w-0 ${className}`}>
      <div className="relative">
        <Link to="/product/$id" params={{ id: productId(p) }} className="block overflow-hidden rounded-md bg-muted">
          <img src={p.img} alt={p.name} loading="lazy" className="aspect-[17/20] w-full object-cover transition-transform duration-300 hover:scale-[1.03]" />
        </Link>
        <button
          aria-label="Add to cart"
          onClick={() => { add(p); toast.success("Added to cart"); }}
          className="absolute bottom-2 right-2 grid size-9 place-items-center rounded-full bg-background/85 text-primary shadow-sm backdrop-blur hover:bg-background"
        >
          <ShoppingCart className="size-4" />
        </button>
      </div>
      <Link to="/product/$id" params={{ id: productId(p) }} className="mt-2 block">
        <p className="line-clamp-2 text-[15px] leading-snug text-foreground/80 sm:text-base">{p.name}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{p.variant}</p>
        <div className="mt-1.5 flex flex-wrap items-baseline gap-x-2">
          <span className="text-base font-semibold text-foreground sm:text-lg">{formatPrice(p.price)}</span>
          <span className="text-xs text-muted-foreground line-through">{formatPrice(p.mrp)}</span>
        </div>
        <p className="text-sm font-medium text-success">{p.off}% OFF</p>
      </Link>
    </div>
  );
}
