import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Heart, User } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { SearchBar } from "@/components/parqis/SearchBar";
import { useShop } from "@/lib/cart";
import { formatPrice } from "@/lib/store";

export const Route = createFileRoute("/account")({
  head: () => ({ meta: [{ title: "My Account - PARQIS" }, { name: "description", content: "Your PARQIS profile and orders." }, { property: "og:title", content: "My Account - PARQIS" }, { property: "og:description", content: "Your PARQIS profile and orders." }] }),
  component: Account,
});

function Account() {
  const { session, authReady } = useShop();
  const nav = useNavigate();
  const uid = session?.user.id;
  const profile = useQuery({ queryKey: ["profile", uid], enabled: !!uid, queryFn: async () => (await supabase.from("profiles").select("*").eq("id", uid!).maybeSingle()).data });
  const orders = useQuery({ queryKey: ["orders", uid], enabled: !!uid, queryFn: async () => (await supabase.from("orders").select("*").order("created_at", { ascending: false })).data ?? [] });

  return (
    <div className="mx-auto min-h-screen max-w-3xl pb-28 pt-8">
      <div className="flex items-center gap-4 px-4"><SearchBar variant="light" /><Link to="/wishlist" aria-label="Wishlist"><Heart className="size-7" /></Link></div>
      <div className="mt-5 flex items-center gap-5 px-4">
        <div className="grid size-[72px] shrink-0 place-items-center rounded-full bg-primary text-primary-foreground"><User className="size-9 fill-current" /></div>
        {session ? (
          <div className="min-w-0"><p className="truncate text-xl font-medium">{profile.data?.name ?? "…"}</p><p className="truncate text-muted-foreground">{session.user.email}</p></div>
        ) : (
          <div><p className="text-xl font-medium">Guest</p><Link to="/login" className="text-primary">Sign in / Create account</Link></div>
        )}
      </div>
      <div className="mt-6 flex justify-around px-4">
        <button onClick={() => (session ? supabase.auth.signOut().then(() => toast("Signed out")) : nav({ to: "/login" }))} className="rounded-full border border-input px-6 py-2 hover:bg-muted">{session ? "Sign out" : "Account"}</button>
        <a href="mailto:support@parqis.com" className="rounded-full border border-input px-6 py-2 hover:bg-muted">Help</a>
        <a href="https://parqis.com/" target="_blank" rel="noreferrer" className="rounded-full border border-input px-6 py-2 hover:bg-muted">Create</a>
      </div>
      <h2 className="mt-8 border-b px-4 pb-3 text-lg font-medium">My Orders</h2>
      {!authReady ? null : !session || !orders.data?.length ? (
        <p className="mt-6 text-center text-lg">No orders found.</p>
      ) : (
        <ul className="divide-y">
          {orders.data.map((o) => (
            <li key={o.id} className="px-4 py-4">
              <div className="flex justify-between"><span className="font-medium">Order #{o.id.slice(0, 8)}</span><span className="text-success">{o.status}</span></div>
              <p className="text-sm text-muted-foreground">{new Date(o.created_at).toLocaleString()} · {(o.items as unknown[]).length} items · {formatPrice(Number(o.total))}</p>
              <p className="truncate text-sm text-muted-foreground">Deliver to: {o.address}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
