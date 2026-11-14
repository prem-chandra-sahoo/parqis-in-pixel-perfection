import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { banners } from "@/lib/store";

export function BannerCarousel() {
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI((x) => (x + 1) % banners.length), 4000); return () => clearInterval(t); }, []);
  return (
    <div className="px-4 sm:px-6">
      <div className="relative overflow-hidden rounded-md">
        <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${i * 100}%)` }}>
          {banners.map((b, n) => (
            <Link key={b} to="/section/$slug" params={{ slug: "college-ready" }} className="w-full shrink-0">
              <img src={b} alt={`Offer ${n + 1}`} className="aspect-[775/543] w-full object-cover" />
            </Link>
          ))}
        </div>
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
          {banners.map((b, n) => (
            <button key={b} aria-label={`Slide ${n + 1}`} onClick={() => setI(n)}
              className={`h-2 rounded-full bg-background transition-all ${n === i ? "w-8" : "w-2 opacity-70"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
