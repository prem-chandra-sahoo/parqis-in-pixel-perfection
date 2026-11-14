import { useNavigate } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { useState } from "react";

export function SearchBar({ variant = "dark", initial = "" }: { variant?: "dark" | "light"; initial?: string }) {
  const [q, setQ] = useState(initial);
  const nav = useNavigate();
  const dark = variant === "dark";

  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        nav({ to: "/search", search: { q } });
      }}
      className={`flex w-full items-center gap-2.5 rounded-full border px-4 py-2 transition-all ${
        dark
          ? "border-festive-foreground/35 bg-festive-foreground/10 text-festive-foreground focus-within:border-festive-foreground/70 focus-within:bg-festive-foreground/15"
          : "border-border/80 bg-muted/40 text-foreground focus-within:border-primary focus-within:bg-background focus-within:ring-1 focus-within:ring-primary"
      }`}
    >
      <Search className="size-4 shrink-0 opacity-70" />
      <input
        aria-label="Search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search for kurtas, dresses, trends..."
        className={`w-full bg-transparent text-xs sm:text-sm outline-none ${
          dark
            ? "placeholder:text-festive-foreground/70 text-festive-foreground"
            : "placeholder:text-muted-foreground text-foreground"
        }`}
      />
      {q ? (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => setQ("")}
          className="rounded-full p-0.5 opacity-60 hover:opacity-100 transition shrink-0"
        >
          <X className="size-3.5" />
        </button>
      ) : null}
    </form>
  );
}
