"use client";

import { useState, type FormEvent } from "react";
import { Input, Textarea } from "@/components/ui/Input";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const valid =
      name.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) && message.trim();
    if (!valid) {
      setError(true);
      return;
    }
    setError(false);
    setSent(true);
  }

  if (sent) {
    return (
      <p className="editorial-heading text-2xl text-ink" role="status">
        Thank you — your message has reached the Maison. We&apos;ll respond within two
        business days.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <Input id="contact-name" label="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <Input
        id="contact-email"
        type="email"
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Textarea
        id="contact-message"
        label="Message"
        rows={5}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      {error ? (
        <p className="small-caps text-purple" role="alert">
          Please complete all fields with a valid email.
        </p>
      ) : null}
      <button
        type="submit"
        className="nav-link w-fit bg-ink px-9 py-4 text-ivory transition-colors hover:bg-purple"
      >
        Send Message
      </button>
    </form>
  );
}
