import { Link, useRouter } from "@tanstack/react-router";
import { ArrowLeft, Heart } from "lucide-react";
import type { ReactNode } from "react";

export function PageShell({ title, children }: { title: string; children: ReactNode }) {
  const router = useRouter();
  return (
    <div className="mx-auto min-h-screen max-w-6xl pb-28">
      <header className="sticky top-0 z-30 flex items-center gap-3 border-b bg-background px-4 py-4 sm:px-6">
        <button aria-label="Back" onClick={() => router.history.back()}><ArrowLeft className="size-6" /></button>
        <h1 className="min-w-0 flex-1 truncate text-xl font-medium">{title}</h1>
        <Link to="/wishlist" aria-label="Wishlist"><Heart className="size-6" /></Link>
      </header>
      {children}
    </div>
  );
}

export function Grid({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-2 gap-x-4 gap-y-6 p-4 sm:grid-cols-3 sm:px-6 md:grid-cols-4 lg:grid-cols-5">{children}</div>;
}
