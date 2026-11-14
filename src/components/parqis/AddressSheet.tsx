import { useState } from "react";
import { Search, LocateFixed, Plus, ChevronRight, MapPin } from "lucide-react";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { useShop } from "@/lib/cart";

export function AddressSheet({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const { address, setAddress } = useShop();
  const [q, setQ] = useState("");
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState("");
  const save = (a: string) => { setAddress(a); onOpenChange(false); toast.success("Delivery address saved"); };
  const locate = () => {
    if (!navigator.geolocation) return toast.error("Location not supported");
    navigator.geolocation.getCurrentPosition(
      (p) => save(`Near ${p.coords.latitude.toFixed(3)}, ${p.coords.longitude.toFixed(3)}`),
      () => toast.error("Couldn't get your location"),
    );
  };
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="mx-auto max-h-[85vh] max-w-2xl overflow-y-auto rounded-t-3xl px-4 pb-8 pt-3">
        <div className="mx-auto mb-5 h-1 w-12 rounded-full bg-border" />
        <SheetTitle className="text-2xl font-medium">Select Delivery Address</SheetTitle>
        <SheetDescription className="mt-1 text-base text-foreground">Choose where you'd like your order delivered.</SheetDescription>
        <form onSubmit={(e) => { e.preventDefault(); if (q.trim()) save(q.trim()); }}
          className="mt-6 flex items-center gap-3 rounded border border-input px-4 py-3.5">
          <Search className="size-5 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search for area, street name..." className="w-full bg-transparent outline-none" />
        </form>
        <button onClick={locate} className="mt-4 flex w-full items-center gap-4 rounded border border-input px-4 py-5 text-left text-primary hover:bg-muted">
          <LocateFixed className="size-6" /><span className="flex-1 text-lg">Use Current Location</span><ChevronRight className="size-5 text-muted-foreground" />
        </button>
        {adding ? (
          <form onSubmit={(e) => { e.preventDefault(); if (form.trim()) save(form.trim()); }} className="mt-4 space-y-2 rounded border border-input p-4">
            <textarea value={form} onChange={(e) => setForm(e.target.value)} required rows={3} placeholder="House no, street, city, PIN" className="w-full rounded border border-input p-2 outline-none" />
            <button className="rounded bg-primary px-5 py-2 text-primary-foreground">Save address</button>
          </form>
        ) : (
          <button onClick={() => setAdding(true)} className="mt-4 flex w-full items-center gap-4 rounded border border-input px-4 py-4 text-primary hover:bg-muted">
            <Plus className="size-6" /><span className="text-lg">Add new address</span>
          </button>
        )}
        <h3 className="mt-8 text-xl font-medium">All Addresses</h3>
        {address ? (
          <div className="mt-4 flex items-center gap-3 rounded border border-primary p-4"><MapPin className="size-5 text-primary" />{address}</div>
        ) : (
          <p className="mt-6 px-8 text-muted-foreground">Address not available, please add</p>
        )}
      </SheetContent>
    </Sheet>
  );
}
