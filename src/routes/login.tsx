import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useShop } from "@/lib/cart";
import { PageShell } from "@/components/parqis/PageShell";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign In / Register - PARQIS" },
      { name: "description", content: "Sign in or create your PARQIS account to track orders and save your wishlist." },
      { property: "og:title", content: "Sign In / Register - PARQIS" },
      { property: "og:description", content: "Sign in or create your PARQIS account to track orders and save your wishlist." },
    ],
  }),
  component: Login,
});

function Login() {
  const { session } = useShop();
  const nav = useNavigate();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (session) nav({ to: "/account" });
  }, [session, nav]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { data, error } =
      mode === "in"
        ? await supabase.auth.signInWithPassword({ email, password: pw })
        : await supabase.auth.signUp({
            email,
            password: pw,
            options: { data: { name }, emailRedirectTo: window.location.origin + "/account" },
          });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    if (mode === "up" && !data.session) toast.success("Check your email to confirm your account");
  };

  const google = async () => {
    const r = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
    if (r.error) toast.error("Google sign-in failed");
  };

  return (
    <PageShell title={mode === "in" ? "Sign In" : "Create Account"}>
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-md rounded-2xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm space-y-5 my-6 sm:my-10">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              {mode === "in" ? "Welcome back" : "Create your account"}
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
              {mode === "in"
                ? "Sign in with your email or Google to continue"
                : "Join PARQIS to unlock festive collections & fast checkout"}
            </p>
          </div>

          <button
            type="button"
            onClick={google}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-border bg-background px-4 py-3 text-sm font-semibold text-foreground shadow-sm transition hover:bg-muted"
          >
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"
              />
            </svg>
            Continue with Google
          </button>

          <div className="relative flex items-center justify-center">
            <div className="w-full border-t border-border" />
            <span className="absolute bg-card px-3 text-xs text-muted-foreground uppercase tracking-wider">
              Or with email
            </span>
          </div>

          <form onSubmit={submit} className="space-y-3.5">
            {mode === "up" && (
              <div>
                <label className="text-xs font-medium text-foreground">Full Name</label>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="mt-1 w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
            )}
            <div>
              <label className="text-xs font-medium text-foreground">Email Address</label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-1 w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-foreground">Password</label>
              <input
                required
                type="password"
                minLength={6}
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                placeholder="At least 6 characters"
                className="mt-1 w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
            <button
              disabled={busy}
              className="mt-2 w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground shadow transition hover:bg-primary/90 disabled:opacity-60"
            >
              {busy ? "Please wait..." : mode === "in" ? "Sign In" : "Create Account"}
            </button>
          </form>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setMode(mode === "in" ? "up" : "in")}
              className="text-xs font-medium text-primary hover:underline"
            >
              {mode === "in" ? "New to PARQIS? Create an account" : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
