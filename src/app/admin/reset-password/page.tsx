"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/Input";

export default function ResetPassword() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  // The reset link from the email establishes a recovery session. The browser
  // client auto-detects the token/code in the URL; we also handle a `?code=`
  // param explicitly for the PKCE flow.
  useEffect(() => {
    const supabase = createClient();
    let active = true;

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (active && session) setReady(true);
    });

    (async () => {
      const code = new URLSearchParams(window.location.search).get("code");
      if (code) {
        await supabase.auth.exchangeCodeForSession(code).catch(() => {});
      }
      const { data } = await supabase.auth.getSession();
      if (active && data.session) setReady(true);
    })();

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    setDone(true);
    setTimeout(() => {
      router.push("/admin");
      router.refresh();
    }, 1500);
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-6">
      <span className="brand-kicker text-purple">Atelier</span>
      <h1 className="editorial-heading mt-2 text-4xl">Set a new password</h1>

      {!ready ? (
        <p className="body-copy mt-4 text-sm">
          Open this page from the link in your reset email. Verifying your link…
        </p>
      ) : done ? (
        <p className="small-caps mt-4 text-ink" role="status">
          Password updated. Signing you in…
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-5">
          <Input
            id="new-password"
            type="password"
            label="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            required
          />
          <Input
            id="confirm-password"
            type="password"
            label="Confirm new password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            autoComplete="new-password"
            required
          />
          {error ? (
            <p className="small-caps text-purple" role="alert">
              {error}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={loading}
            className="nav-link mt-2 bg-ink py-4 text-ivory transition-colors hover:bg-purple disabled:opacity-50"
          >
            {loading ? "Saving…" : "Update password"}
          </button>
        </form>
      )}
    </div>
  );
}
