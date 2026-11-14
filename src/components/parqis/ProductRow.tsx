import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { slug, type Product } from "@/lib/store";
import { ProductCard } from "./ProductCard";

export function ProductRow({ title, products }: { title: string; products: Product[] }) {
  const rowRef = useRef<HTMLDivElement>(null);
  if (!products.length) return null;

  const scroll = (dir: "left" | "right") => {
    if (rowRef.current) {
      rowRef.current.scrollBy({ left: dir === "left" ? -400 : 400, behavior: "smooth" });
    }
  };

  return (
    <section className="group/row relative mx-auto max-w-7xl py-5 sm:py-7">
      <div className="mb-3 sm:mb-4 flex items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <h2 className="truncate text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-foreground">
          {title}
        </h2>
        <Link
          to="/section/$slug"
          params={{ slug: slug(title) }}
          className="flex shrink-0 items-center text-xs sm:text-sm font-semibold text-primary hover:underline"
        >
          View all <ChevronRight className="size-4" />
        </Link>
      </div>

      <div className="relative">
        {/* Desktop Prev / Next Navigation Arrows */}
        <button
          aria-label="Scroll left"
          onClick={() => scroll("left")}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 hidden size-9 place-items-center rounded-full border border-border/80 bg-background/90 text-foreground shadow-md backdrop-blur transition-all opacity-0 group-hover/row:opacity-100 hover:bg-background md:grid"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          aria-label="Scroll right"
          onClick={() => scroll("right")}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 hidden size-9 place-items-center rounded-full border border-border/80 bg-background/90 text-foreground shadow-md backdrop-blur transition-all opacity-0 group-hover/row:opacity-100 hover:bg-background md:grid"
        >
          <ChevronRight className="size-5" />
        </button>

        {/* Horizontal scroll list */}
        <div
          ref={rowRef}
          className="no-scrollbar flex gap-3 sm:gap-4 md:gap-5 overflow-x-auto scroll-smooth px-4 pb-2 sm:px-6 lg:px-8"
        >
          {products.map((p) => (
            <ProductCard
              key={p.img}
              p={p}
              className="w-[42%] min-w-[145px] sm:w-[185px] md:w-[205px] lg:w-[225px] shrink-0"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
