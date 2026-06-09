import type { Metadata } from "next";
import Link from "next/link";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export const metadata: Metadata = {
  title: "Atelier",
  robots: { index: false, follow: false },
};

function SetupNotice() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-24">
      <span className="brand-kicker text-purple">Atelier</span>
      <h1 className="editorial-heading mt-3 text-4xl">Backend not configured yet</h1>
      <p className="body-copy mt-5">
        The admin dashboard needs a Supabase project. Add these to a{" "}
        <code className="text-ink">.env.local</code> file (and to Vercel later):
      </p>
      <pre className="mt-5 overflow-x-auto border border-line bg-cream p-4 text-xs text-ink">
{`NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...`}
      </pre>
      <p className="body-copy mt-5 text-sm">
        See <code className="text-ink">SETUP.md</code> for step-by-step instructions, then
        restart the dev server.
      </p>
      <Link href="/" className="nav-link link-underline mt-8 inline-block text-ink hover:text-purple">
        Back to site
      </Link>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!isSupabaseConfigured) {
    return (
      <div className="min-h-screen bg-ivory text-ink">
        <SetupNotice />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory text-ink">
      <header className="bg-ink text-ivory">
        <div className="mx-auto flex max-w-[1100px] items-center justify-between px-6 py-4">
          <Link href="/admin" className="brand-logo text-lg">
            SOTTOVOCE <span className="text-gold">Atelier</span>
          </Link>
          <Link href="/" className="small-caps text-cream/80 hover:text-gold">
            View site
          </Link>
        </div>
      </header>
      <div className="mx-auto max-w-[1100px] px-6 py-10">{children}</div>
    </div>
  );
}
