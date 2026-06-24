"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/Input";

type Mode = "signin" | "reset";

export default function AdminLogin() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSignIn(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  async function onReset(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setNotice(null);
    if (!email.trim()) {
      setError("Enter your email first.");
      return;
    }
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/admin/reset-password`,
    });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    setNotice("Check your inbox — we've sent a link to reset your password.");
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-6">
      <span className="brand-kicker text-purple">Atelier</span>
      <h1 className="editorial-heading mt-2 text-4xl">
        {mode === "signin" ? "Sign in" : "Reset password"}
      </h1>
      <p className="body-copy mt-3 text-sm">
        {mode === "signin"
          ? "Maison SOTTOVOCE administration."
          : "We'll email you a link to set a new password."}
      </p>

      {mode === "signin" ? (
        <form onSubmit={onSignIn} className="mt-8 flex flex-col gap-5">
          <Input
            id="email"
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
          <Input
            id="password"
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
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
            {loading ? "Signing in…" : "Sign in"}
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("reset");
              setError(null);
              setNotice(null);
            }}
            className="small-caps self-start text-muted hover:text-purple"
          >
            Forgot password?
          </button>
        </form>
      ) : (
        <form onSubmit={onReset} className="mt-8 flex flex-col gap-5">
          <Input
            id="reset-email"
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
          {error ? (
            <p className="small-caps text-purple" role="alert">
              {error}
            </p>
          ) : null}
          {notice ? (
            <p className="small-caps text-ink" role="status">
              {notice}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={loading}
            className="nav-link mt-2 bg-ink py-4 text-ivory transition-colors hover:bg-purple disabled:opacity-50"
          >
            {loading ? "Sending…" : "Send reset link"}
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("signin");
              setError(null);
              setNotice(null);
            }}
            className="small-caps self-start text-muted hover:text-purple"
          >
            ← Back to sign in
          </button>
        </form>
      )}
    </div>
  );
}
