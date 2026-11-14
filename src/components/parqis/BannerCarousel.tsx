import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { banners } from "@/lib/store";

export function BannerCarousel() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((x) => (x + 1) % banners.length), 4500);
    return () => clearInterval(t);
  }, [paused]);

  const prev = () => setI((x) => (x === 0 ? banners.length - 1 : x - 1));
  const next = () => setI((x) => (x + 1) % banners.length);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-4 sm:mt-6">
      <div
        className="group relative overflow-hidden rounded-xl shadow-sm"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${i * 100}%)` }}
        >
          {banners.map((b, n) => (
            <Link
              key={b}
              to="/section/$slug"
              params={{ slug: "college-ready" }}
              className="w-full shrink-0 block"
            >
              <img
                src={b}
                alt={`Offer ${n + 1}`}
                className="aspect-[775/543] sm:aspect-[16/7] md:aspect-[21/8] lg:aspect-[24/8] max-h-[440px] w-full object-cover object-center"
              />
            </Link>
          ))}
        </div>

        {/* Desktop Prev / Next Buttons */}
        <button
          aria-label="Previous slide"
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 hidden md:grid size-10 place-items-center rounded-full bg-background/80 text-foreground shadow-md backdrop-blur transition-all opacity-0 group-hover:opacity-100 hover:bg-background"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          aria-label="Next slide"
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 hidden md:grid size-10 place-items-center rounded-full bg-background/80 text-foreground shadow-md backdrop-blur transition-all opacity-0 group-hover:opacity-100 hover:bg-background"
        >
          <ChevronRight className="size-5" />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full bg-black/25 px-2.5 py-1 backdrop-blur-sm">
          {banners.map((b, n) => (
            <button
              key={b}
              aria-label={`Slide ${n + 1}`}
              onClick={() => setI(n)}
              className={`h-1.5 rounded-full transition-all ${
                n === i ? "w-6 bg-white" : "w-1.5 bg-white/60 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
