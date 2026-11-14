import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { slug, type Product } from "@/lib/store";
import { ProductCard } from "./ProductCard";

export function ProductRow({ title, products }: { title: string; products: Product[] }) {
  if (!products.length) return null;
  return (
    <section className="py-5">
      <div className="mb-4 flex items-center justify-between gap-3 px-4 sm:px-6">
        <h2 className="truncate text-[22px] font-semibold tracking-tight text-foreground/85 sm:text-2xl">{title}</h2>
        <Link to="/section/$slug" params={{ slug: slug(title) }} className="flex shrink-0 items-center text-[17px] text-primary hover:underline">
          View more <ChevronRight className="size-4" />
        </Link>
      </div>
      <div className="no-scrollbar flex gap-4 overflow-x-auto px-4 pb-1 sm:px-6">
        {products.map((p) => (
          <ProductCard key={p.img} p={p} className="w-[42%] shrink-0 sm:w-[200px] lg:w-[220px]" />
        ))}
      </div>
    </section>
  );
}
