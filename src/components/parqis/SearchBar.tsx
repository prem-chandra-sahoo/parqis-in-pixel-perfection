import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useState } from "react";

export function SearchBar({ variant = "dark", initial = "" }: { variant?: "dark" | "light"; initial?: string }) {
  const [q, setQ] = useState(initial);
  const nav = useNavigate();
  const dark = variant === "dark";
  return (
    <form role="search" onSubmit={(e) => { e.preventDefault(); nav({ to: "/search", search: { q } }); }}
      className={`flex w-full items-center gap-3 rounded-md border px-4 py-2.5 ${dark ? "border-festive-foreground/40 text-festive-foreground" : "border-input text-foreground"}`}>
      <Search className="size-4 shrink-0 opacity-80" />
      <input aria-label="Search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search for products, creators..."
        className={`w-full bg-transparent text-[15px] outline-none ${dark ? "placeholder:text-festive-foreground/85" : "placeholder:text-muted-foreground"}`} />
    </form>
  );
}
