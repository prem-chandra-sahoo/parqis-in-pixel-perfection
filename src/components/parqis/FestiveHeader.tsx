import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { categories, type Tab } from "@/lib/store";

const TABS: Tab[] = ["ALL", "ETHNIC", "WESTERN", "MEN"];

export function FestiveHeader({ tab, onTab }: { tab: Tab; onTab: (t: Tab) => void }) {
  const catScrollRef = useRef<HTMLDivElement>(null);

  const scrollCats = (dir: "left" | "right") => {
    if (catScrollRef.current) {
      catScrollRef.current.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });
    }
  };

  return (
    <div className="relative text-festive-foreground">
      {/* Festive Hero Banner Area / Tabs & Categories */}
      <div
        className="bg-festive bg-cover bg-bottom px-4 pb-8 pt-4 sm:px-6 md:pt-6 lg:px-8"
        style={{ backgroundImage: "linear-gradient(to bottom, var(--festive) 0%, var(--festive-mid) 75%, var(--background) 100%)" }}
      >
        {/* Responsive Category Tabs */}
        <div className="no-scrollbar flex gap-2 overflow-x-auto md:justify-center">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => onTab(t)}
              className={`min-w-[28%] shrink-0 rounded-full px-5 py-2 text-sm font-semibold tracking-wide transition sm:min-w-[130px] sm:text-base md:min-w-[140px] ${
                tab === t
                  ? "border border-festive-foreground/90 bg-festive-foreground/15 shadow-sm text-festive-foreground"
                  : "text-festive-foreground/75 hover:text-festive-foreground hover:bg-festive-foreground/5"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Categories Carousel with Horizontal Scroll & Desktop Arrows */}
        <div className="relative mt-6 sm:mt-8">
          {/* Desktop Scroll Controls */}
          <button
            aria-label="Scroll left"
            onClick={() => scrollCats("left")}
            className="absolute -left-3 top-1/3 z-10 hidden size-9 -translate-y-1/2 place-items-center rounded-full border border-border/80 bg-background/90 text-foreground shadow-md backdrop-blur transition hover:bg-background md:grid"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            aria-label="Scroll right"
            onClick={() => scrollCats("right")}
            className="absolute -right-3 top-1/3 z-10 hidden size-9 -translate-y-1/2 place-items-center rounded-full border border-border/80 bg-background/90 text-foreground shadow-md backdrop-blur transition hover:bg-background md:grid"
          >
            <ChevronRight className="size-5" />
          </button>

          <div
            ref={catScrollRef}
            className="no-scrollbar flex gap-3 overflow-x-auto scroll-smooth px-1 sm:gap-5 md:gap-6 lg:justify-center"
          >
            {categories.map((c) => (
              <Link
                key={c.name}
                to="/search"
                search={{ q: c.name.replace(/'s|s$/g, "").split(" ").slice(-1)[0] ?? "" }}
                className="group w-[82px] shrink-0 text-center sm:w-[98px] md:w-[110px] lg:w-[120px]"
              >
                <div className="mx-auto aspect-square w-full overflow-hidden rounded-full p-1.5 transition-transform duration-300 group-hover:scale-105">
                  <img
                    src={c.img}
                    alt={c.name}
                    className="aspect-square w-full rounded-full object-contain drop-shadow"
                  />
                </div>
                <p className="mt-1 line-clamp-2 text-xs font-medium leading-tight sm:text-sm">
                  {c.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
