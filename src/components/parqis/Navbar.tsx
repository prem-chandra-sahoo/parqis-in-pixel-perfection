import { Link, useLocation } from "@tanstack/react-router";
import {
  Menu,
  ChevronDown,
  Heart,
  MapPin,
  ShoppingCart,
  User,
  Sparkles,
  Home,
  LayoutGrid,
  CirclePlay,
  Mail,
  X,
} from "lucide-react";
import { useState } from "react";
import { useShop } from "@/lib/cart";
import { SearchBar } from "./SearchBar";
import { AddressSheet } from "./AddressSheet";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export function Navbar() {
  const { pathname } = useLocation();
  const { address, wishlist, count } = useShop();
  const [addressOpen, setAddressOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isHome = pathname === "/";

  const navLinks = [
    { to: "/", label: "Home", icon: Home },
    { to: "/categories", label: "Categories", icon: LayoutGrid },
    { to: "/trends", label: "Trends", icon: CirclePlay },
  ] as const;

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-colors ${
          isHome
            ? "border-b border-festive-foreground/20 bg-festive/95 text-festive-foreground shadow-md backdrop-blur-md"
            : "border-b border-border/80 bg-background/95 text-foreground shadow-xs backdrop-blur-md"
        }`}
      >
        {/* Desktop & Tablet Navigation (md and up) */}
        <div className="mx-auto hidden max-w-7xl items-center justify-between gap-4 px-4 py-3 md:flex sm:px-6 lg:px-8">
          {/* Logo & Delivery Location */}
          <div className="flex items-center gap-4 lg:gap-6 shrink-0">
            <Link to="/" className="group flex items-center gap-2">
              <span className="text-2xl font-bold tracking-wider font-sans transition group-hover:opacity-90">
                PARQIS
              </span>
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase ${
                  isHome
                    ? "bg-festive-foreground/20 text-festive-foreground"
                    : "bg-primary/10 text-primary"
                }`}
              >
                <Sparkles className="size-3" /> Festive
              </span>
            </Link>

            <button
              onClick={() => setAddressOpen(true)}
              className={`flex max-w-[190px] lg:max-w-[230px] items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition ${
                isHome
                  ? "border-festive-foreground/25 hover:bg-festive-foreground/10 text-festive-foreground"
                  : "border-border hover:bg-muted text-foreground"
              }`}
            >
              <MapPin className="size-3.5 shrink-0 text-primary" />
              <span className="truncate">{address ? `Deliver: ${address}` : "Select Address"}</span>
              <ChevronDown className="size-3 shrink-0 opacity-70" />
            </button>
          </div>

          {/* Central Search Bar */}
          <div className="flex-1 max-w-md lg:max-w-xl">
            <SearchBar variant={isHome ? "dark" : "light"} />
          </div>

          {/* Navigation Links & Action Menu Items */}
          <div className="flex items-center gap-1 lg:gap-2 shrink-0">
            <nav className="flex items-center gap-1 mr-1">
              {navLinks.map(({ to, label }) => {
                const active = pathname === to;
                return (
                  <Link
                    key={to}
                    to={to}
                    className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
                      active
                        ? isHome
                          ? "bg-festive-foreground/20 font-semibold text-festive-foreground"
                          : "bg-muted text-primary font-semibold"
                        : isHome
                          ? "text-festive-foreground/80 hover:text-festive-foreground hover:bg-festive-foreground/10"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className={`relative flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium transition ${
                isHome ? "hover:bg-festive-foreground/10" : "hover:bg-muted"
              }`}
            >
              <div className="relative">
                <Heart className="size-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -right-2 -top-1.5 grid size-4 place-items-center rounded-full bg-primary text-[10px] text-primary-foreground font-bold">
                    {wishlist.length}
                  </span>
                )}
              </div>
              <span className="hidden xl:inline">Wishlist</span>
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              aria-label="Cart"
              className={`relative flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium transition ${
                isHome ? "hover:bg-festive-foreground/10" : "hover:bg-muted"
              }`}
            >
              <div className="relative">
                <ShoppingCart className="size-5" />
                {count > 0 && (
                  <span className="absolute -right-2 -top-1.5 grid size-4 place-items-center rounded-full bg-primary text-[10px] text-primary-foreground font-bold">
                    {count}
                  </span>
                )}
              </div>
              <span className="hidden xl:inline">Cart</span>
            </Link>

            {/* Account */}
            <Link
              to="/account"
              aria-label="Account"
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium transition ${
                isHome ? "hover:bg-festive-foreground/10" : "hover:bg-muted"
              }`}
            >
              <User className="size-5" />
              <span className="hidden xl:inline">Account</span>
            </Link>
          </div>
        </div>

        {/* Mobile Navigation (under md) */}
        <div className="block md:hidden px-4 pb-2.5 pt-2.5">
          <div className="flex items-center justify-between gap-2 mb-2">
            {/* Hamburger + Brand */}
            <div className="flex items-center gap-2.5 min-w-0">
              <button
                aria-label="Open navigation menu"
                onClick={() => setMobileMenuOpen(true)}
                className={`-ml-1 rounded-lg p-1.5 transition ${
                  isHome ? "hover:bg-festive-foreground/15 text-festive-foreground" : "hover:bg-muted text-foreground"
                }`}
              >
                <Menu className="size-6" />
              </button>
              <Link to="/" className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-wider font-sans">PARQIS</span>
                <span className="rounded bg-primary/20 px-1.5 py-0.2 text-[9px] font-bold text-primary">
                  Festive
                </span>
              </Link>
            </div>

            {/* Address Selector + Wishlist + Cart */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setAddressOpen(true)}
                className={`flex max-w-[120px] items-center gap-1 rounded-full border px-2 py-1 text-[11px] font-medium transition ${
                  isHome
                    ? "border-festive-foreground/25 bg-festive-foreground/10 text-festive-foreground"
                    : "border-border bg-muted/40 text-foreground"
                }`}
              >
                <MapPin className="size-3 shrink-0 text-primary" />
                <span className="truncate">{address ?? "Location"}</span>
              </button>

              <Link
                to="/wishlist"
                aria-label="Wishlist"
                className={`relative p-1.5 transition rounded-full ${
                  isHome ? "text-festive-foreground hover:bg-festive-foreground/15" : "text-foreground hover:bg-muted"
                }`}
              >
                <Heart className="size-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 grid size-4 place-items-center rounded-full bg-primary text-[10px] text-primary-foreground font-bold">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              <Link
                to="/cart"
                aria-label="Cart"
                className={`relative p-1.5 transition rounded-full ${
                  isHome ? "text-festive-foreground hover:bg-festive-foreground/15" : "text-foreground hover:bg-muted"
                }`}
              >
                <ShoppingCart className="size-5" />
                {count > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 grid size-4 place-items-center rounded-full bg-primary text-[10px] text-primary-foreground font-bold">
                    {count}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <SearchBar variant={isHome ? "dark" : "light"} />
        </div>
      </header>

      {/* Mobile Hamburger Drawer Menu */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="w-[300px] p-0 sm:max-w-xs flex flex-col justify-between">
          <div>
            {/* Sheet Header */}
            <SheetHeader className="border-b px-5 py-4 text-left">
              <div className="flex items-center justify-between">
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2"
                >
                  <SheetTitle className="text-xl font-bold tracking-wider font-sans">
                    PARQIS
                  </SheetTitle>
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                    Festive
                  </span>
                </Link>
                <button
                  aria-label="Close menu"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <X className="size-5" />
                </button>
              </div>
            </SheetHeader>

            {/* Navigation Links */}
            <div className="p-4 space-y-1">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  pathname === "/" ? "bg-primary text-primary-foreground font-semibold" : "text-foreground hover:bg-muted"
                }`}
              >
                <Home className="size-5" />
                <span>Home</span>
              </Link>

              <Link
                to="/categories"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  pathname === "/categories" ? "bg-primary text-primary-foreground font-semibold" : "text-foreground hover:bg-muted"
                }`}
              >
                <LayoutGrid className="size-5" />
                <span>Categories</span>
              </Link>

              <Link
                to="/trends"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  pathname === "/trends" ? "bg-primary text-primary-foreground font-semibold" : "text-foreground hover:bg-muted"
                }`}
              >
                <CirclePlay className="size-5" />
                <span>Trends & Looks</span>
              </Link>

              <div className="my-2 border-t border-border/80" />

              <Link
                to="/cart"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition ${
                  pathname === "/cart" ? "bg-primary text-primary-foreground font-semibold" : "text-foreground hover:bg-muted"
                }`}
              >
                <div className="flex items-center gap-3">
                  <ShoppingCart className="size-5" />
                  <span>Cart</span>
                </div>
                {count > 0 && (
                  <span className="rounded-full bg-primary/20 px-2 py-0.5 text-xs font-bold text-primary">
                    {count}
                  </span>
                )}
              </Link>

              <Link
                to="/wishlist"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition ${
                  pathname === "/wishlist" ? "bg-primary text-primary-foreground font-semibold" : "text-foreground hover:bg-muted"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Heart className="size-5" />
                  <span>Wishlist</span>
                </div>
                {wishlist.length > 0 && (
                  <span className="rounded-full bg-primary/20 px-2 py-0.5 text-xs font-bold text-primary">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              <Link
                to="/account"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  pathname === "/account" ? "bg-primary text-primary-foreground font-semibold" : "text-foreground hover:bg-muted"
                }`}
              >
                <User className="size-5" />
                <span>My Account</span>
              </Link>
            </div>
          </div>

          {/* Drawer Footer: Address & Support */}
          <div className="border-t p-4 space-y-3 bg-muted/20">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setAddressOpen(true);
              }}
              className="flex w-full items-center justify-between rounded-xl border border-border bg-card p-3 text-left text-xs transition hover:bg-muted"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <MapPin className="size-4 shrink-0 text-primary" />
                <div className="min-w-0">
                  <p className="font-semibold text-foreground">Delivery Location</p>
                  <p className="truncate text-muted-foreground">{address ?? "Choose address"}</p>
                </div>
              </div>
              <ChevronDown className="size-4 text-muted-foreground" />
            </button>

            <a
              href="mailto:support@parqis.com"
              className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
            >
              <Mail className="size-4" />
              <span>Need help? Contact support</span>
            </a>
          </div>
        </SheetContent>
      </Sheet>

      {/* Global Delivery Address Sheet */}
      <AddressSheet open={addressOpen} onOpenChange={setAddressOpen} />
    </>
  );
}
