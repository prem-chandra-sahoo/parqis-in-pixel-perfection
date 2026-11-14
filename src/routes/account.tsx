import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, User } from "lucide-react";
import { toast } from "sonner";
import { SearchBar } from "@/components/parqis/SearchBar";

export const Route = createFileRoute("/account")({
  head: () => ({ meta: [{ title: "My Account - PARQIS" }, { name: "description", content: "Your PARQIS profile and orders." }, { property: "og:title", content: "My Account - PARQIS" }, { property: "og:description", content: "Your PARQIS profile and orders." }] }),
  component: () => (
    <div className="mx-auto min-h-screen max-w-3xl pb-28 pt-8">
      <div className="flex items-center gap-4 px-4"><SearchBar variant="light" /><Link to="/wishlist" aria-label="Wishlist"><Heart className="size-7" /></Link></div>
      <div className="mt-5 flex items-center gap-5 px-4">
        <div className="grid size-[72px] place-items-center rounded-full bg-primary text-primary-foreground"><User className="size-9 fill-current" /></div>
        <div><p className="text-xl font-medium">Guest</p><p className="text-muted-foreground">Sign in to see your details</p></div>
      </div>
      <div className="mt-6 flex justify-around px-4">
        {["Account", "Help", "Create"].map((l) => <button key={l} onClick={() => toast(`${l} is coming soon`)} className="rounded-full border border-input px-6 py-2 hover:bg-muted">{l}</button>)}
      </div>
      <h2 className="mt-8 border-b px-4 pb-3 text-lg font-medium">My Orders</h2>
      <p className="mt-6 text-center text-lg">No orders found.</p>
    </div>
  ),
});
