import { Link } from "@tanstack/react-router";
import { Heart, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { formatPrice, productId, type Product } from "@/lib/store";
import { useShop } from "@/lib/cart";

export function ProductCard({ p, className = "" }: { p: Product; className?: string }) {
  const { add, toggleWish, isWished } = useShop();
  const wished = isWished(p);

  return (
    <div className={`group min-w-0 ${className}`}>
      <div className="relative overflow-hidden rounded-lg bg-muted">
        <Link to="/product/$id" params={{ id: productId(p) }} className="block overflow-hidden">
          <img
            src={p.img}
            alt={p.name}
            loading="lazy"
            className="aspect-[17/20] w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
          />
        </Link>

        {/* Discount Badge */}
        {p.off > 0 && (
          <span className="absolute left-2 top-2 rounded bg-primary/90 px-1.5 py-0.5 text-[11px] font-bold text-primary-foreground backdrop-blur-sm">
            {p.off}% OFF
          </span>
        )}

        {/* Wishlist Button */}
        <button
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          onClick={(e) => {
            e.preventDefault();
            toggleWish(p);
            toast.success(wished ? "Removed from wishlist" : "Added to wishlist");
          }}
          className="absolute right-2 top-2 grid size-8 place-items-center rounded-full bg-background/80 text-foreground shadow-sm backdrop-blur transition hover:bg-background hover:scale-110"
        >
          <Heart className={`size-4 ${wished ? "fill-primary text-primary" : "text-foreground"}`} />
        </button>

        {/* Quick Add to Cart */}
        <button
          aria-label="Add to cart"
          onClick={(e) => {
            e.preventDefault();
            add(p);
            toast.success("Added to cart");
          }}
          className="absolute bottom-2 right-2 grid size-8 sm:size-9 place-items-center rounded-full bg-background/90 text-primary shadow-sm backdrop-blur transition hover:bg-background hover:scale-110"
        >
          <ShoppingCart className="size-4" />
        </button>
      </div>

      <Link to="/product/$id" params={{ id: productId(p) }} className="mt-2 block">
        <p className="line-clamp-2 text-xs font-medium leading-snug text-foreground/90 sm:text-sm group-hover:text-primary transition-colors">
          {p.name}
        </p>
        <p className="mt-0.5 truncate text-[11px] text-muted-foreground sm:text-xs">
          {p.variant}
        </p>
        <div className="mt-1 flex flex-wrap items-baseline gap-x-2">
          <span className="text-sm font-bold text-foreground sm:text-base">
            {formatPrice(p.price)}
          </span>
          {p.mrp > p.price && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(p.mrp)}
            </span>
          )}
        </div>
      </Link>
    </div>
  );
}
