"use client";

import { useState, type FormEvent } from "react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!valid) {
      setStatus("error");
      return;
    }
    setStatus("success");
    setEmail("");
  }

  return (
    <section className="border-b border-line-dark bg-charcoal px-6 py-20 text-cream sm:py-24">
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <span className="brand-kicker text-gold">Enter the Maison</span>
        <h2 className="section-heading mt-4 text-3xl text-ivory sm:text-4xl md:text-5xl">
          Join the SOTTOVOCE world
        </h2>
        <p className="body-copy mt-4 text-cream/75">
          Early access. Exclusive invitations. Private collections.
        </p>

        {status === "success" ? (
          <p className="mt-8 text-lg italic text-gold" role="status">
            Welcome to the Maison. Watch your inbox for what&apos;s worth knowing.
          </p>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="mt-8 w-full max-w-md">
            <div className="flex items-center gap-3 border-b border-line-dark pb-1 focus-within:border-gold">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                placeholder="Email address"
                className="w-full bg-transparent py-3 text-cream placeholder:text-cream/45 focus:outline-none"
              />
              <button
                type="submit"
                className="nav-link shrink-0 px-2 py-2 text-ivory transition-colors hover:text-gold"
              >
                Join
              </button>
            </div>
            {status === "error" ? (
              <p className="small-caps mt-3 text-left text-gold" role="alert">
                Please enter a valid email address
              </p>
            ) : null}
            <p className="small-caps mt-4 text-cream/40">No noise. Only what is worth knowing.</p>
          </form>
        )}
      </div>
    </section>
  );
}
