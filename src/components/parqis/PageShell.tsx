import { Link, useRouter } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

export function PageShell({ title, children }: { title: string; children: ReactNode }) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background">
      {/* Sub-bar with Back Button & Breadcrumbs */}
      <div className="border-b border-border/60 bg-muted/20 px-4 py-2.5 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              aria-label="Go back"
              onClick={() => router.history.back()}
              className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold text-muted-foreground transition hover:bg-muted hover:text-foreground"
            >
              <ArrowLeft className="size-3.5" />
              <span>Back</span>
            </button>
            <div className="h-3.5 w-px bg-border" />
            <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Link to="/" className="hover:text-primary transition">Home</Link>
              <span>/</span>
              <span className="truncate font-medium text-foreground">{title}</span>
            </nav>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl pb-16">
        {children}
      </main>
    </div>
  );
}

export function Grid({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-2 gap-3 p-3 xs:gap-4 xs:p-4 sm:grid-cols-3 sm:gap-4 sm:px-6 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {children}
    </div>
  );
}
