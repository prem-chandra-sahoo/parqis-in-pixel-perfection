import { Link } from "@tanstack/react-router";
import { ChevronDown, Heart, MapPin, User } from "lucide-react";
import { useState } from "react";
import { categories, type Tab } from "@/lib/store";
import { useShop } from "@/lib/cart";
import { AddressSheet } from "./AddressSheet";
import { SearchBar } from "./SearchBar";

const TABS: Tab[] = ["ALL", "ETHNIC", "WESTERN", "MEN"];
const BG = "https://parqis.com/festive/festive-header-bg.png";

export function FestiveHeader({ tab, onTab }: { tab: Tab; onTab: (t: Tab) => void }) {
  const [open, setOpen] = useState(false);
  const { address, wishlist } = useShop();
  return (
    <div className="relative text-festive-foreground">
      <div className="sticky top-0 z-30 bg-festive bg-cover bg-top px-4 pb-3 pt-5 sm:px-6" style={{ backgroundColor: "var(--festive)", backgroundImage: `url(${BG})` }}>
        <div className="mb-4 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
          <button onClick={() => setOpen(true)} className="flex min-w-0 items-center gap-1 text-[17px] font-medium">
            <MapPin className="size-5 shrink-0" /><span className="truncate">{address ?? "Select an address"}</span><ChevronDown className="size-4 shrink-0" />
          </button>
          <div className="flex items-center gap-5">
            <Link to="/wishlist" aria-label="Wishlist" className="relative"><Heart className="size-7" />
              {wishlist.length > 0 && <span className="absolute -right-1 -top-1 grid size-4 place-items-center rounded-full bg-primary text-[10px]">{wishlist.length}</span>}
            </Link>
            <Link to="/account" aria-label="Account"><User className="size-7" /></Link>
          </div>
        </div>
        <SearchBar />
      </div>
      <div className="bg-festive bg-cover bg-bottom px-4 pb-6 pt-4 sm:px-6" style={{ backgroundImage: "linear-gradient(to bottom, var(--festive) 0%, var(--festive-mid) 75%, var(--background) 100%)" }}>
        <div className="no-scrollbar flex gap-2 overflow-x-auto">
          {TABS.map((t) => (
            <button key={t} onClick={() => onTab(t)}
              className={`min-w-[30%] shrink-0 rounded-full px-6 py-2 text-[17px] transition sm:min-w-[160px] ${tab === t ? "border border-festive-foreground/80 bg-festive-foreground/5" : "text-festive-foreground/75 hover:text-festive-foreground"}`}>
              {t}
            </button>
          ))}
        </div>
        <div className="no-scrollbar mt-8 flex gap-4 overflow-x-auto sm:gap-6">
          {categories.map((c) => (
            <Link key={c.name} to="/search" search={{ q: c.name.replace(/'s|s$/g, "").split(" ").slice(-1)[0] ?? "" }} className="w-[90px] shrink-0 text-center sm:w-[110px]">
              <img src={c.img} alt={c.name} className="mx-auto aspect-square w-full object-contain transition-transform hover:-translate-y-1" />
              <p className="mt-1 line-clamp-2 text-[15px] leading-tight sm:text-base">{c.name}</p>
            </Link>
          ))}
        </div>
      </div>
      <AddressSheet open={open} onOpenChange={setOpen} />
    </div>
  );
}
