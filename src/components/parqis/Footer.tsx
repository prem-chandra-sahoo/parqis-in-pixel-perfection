import { Link } from "@tanstack/react-router";
import { Sparkles, ShieldCheck, Truck, RotateCcw, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/80 bg-card text-foreground">
      {/* Feature Highlights Banner */}
      <div className="border-b border-border/60 bg-muted/30">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-8 sm:grid-cols-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="grid size-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
              <Truck className="size-5" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-semibold">Free Express Shipping</p>
              <p className="text-[11px] text-muted-foreground">On all orders across India</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="grid size-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
              <RotateCcw className="size-5" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-semibold">7 Days Easy Return</p>
              <p className="text-[11px] text-muted-foreground">Doorstep pickup available</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="grid size-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
              <ShieldCheck className="size-5" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-semibold">100% Authentic</p>
              <p className="text-[11px] text-muted-foreground">Directly from top makers</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="grid size-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
              <Sparkles className="size-3.5" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-semibold">Festive Pixel Perfect</p>
              <p className="text-[11px] text-muted-foreground">Celebration ready edits</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:gap-12">
          {/* Brand Info */}
          <div className="col-span-2 sm:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold tracking-wider font-sans">PARQIS</span>
            </Link>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              Online shopping & creator entertainment destination for festive, ethnic, and contemporary western styles.
            </p>
            <p className="mt-4 text-xs font-medium text-foreground flex items-center gap-1.5">
              Crafted with <Heart className="size-3.5 fill-primary text-primary" /> for style lovers.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">Explore</h4>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <Link to="/" className="text-muted-foreground transition hover:text-primary">
                  Festive Edit
                </Link>
              </li>
              <li>
                <Link to="/trends" className="text-muted-foreground transition hover:text-primary">
                  Creator Trends
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-muted-foreground transition hover:text-primary">
                  All Collections
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="text-muted-foreground transition hover:text-primary">
                  My Wishlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">Account & Help</h4>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <Link to="/account" className="text-muted-foreground transition hover:text-primary">
                  My Account
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-muted-foreground transition hover:text-primary">
                  View Cart
                </Link>
              </li>
              <li>
                <a href="mailto:support@parqis.com" className="text-muted-foreground transition hover:text-primary">
                  Help & Support
                </a>
              </li>
              <li>
                <a href="https://parqis.com/" target="_blank" rel="noreferrer" className="text-muted-foreground transition hover:text-primary">
                  Creator Platform
                </a>
              </li>
            </ul>
          </div>

          {/* About & Policies */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">About PARQIS</h4>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              Experience fashion inspired by creators. 100% verified styles, secure checkout, and effortless returns.
            </p>
            <div className="mt-4 text-xs text-muted-foreground">
              Support: <a href="mailto:support@parqis.com" className="font-semibold text-foreground hover:underline">support@parqis.com</a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-border/60 pt-6 text-center text-xs text-muted-foreground sm:flex sm:items-center sm:justify-between sm:text-left">
          <p>© {new Date().getFullYear()} PARQIS. All rights reserved.</p>
          <p className="mt-2 sm:mt-0 text-[11px]">
            Pixel perfection in festive and everyday fashion.
          </p>
        </div>
      </div>
    </footer>
  );
}
