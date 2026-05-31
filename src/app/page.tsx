export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-6 sm:px-12">
        <span className="font-[family-name:var(--font-display)] text-lg tracking-[0.2em] uppercase">
          Sottovoce
        </span>
        <nav className="hidden gap-8 text-xs uppercase tracking-[0.18em] text-muted sm:flex">
          <a className="transition-colors hover:text-foreground" href="#house">
            The House
          </a>
          <a className="transition-colors hover:text-foreground" href="#contact">
            Contact
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        <p className="mb-6 text-xs uppercase tracking-[0.35em] text-accent">
          Maison
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-6xl font-light leading-[0.95] tracking-tight sm:text-8xl">
          Sottovoce
        </h1>
        <p className="mt-8 max-w-xl font-[family-name:var(--font-display)] text-2xl italic text-muted sm:text-3xl">
          In a soft voice.
        </p>
        <p className="mt-6 max-w-md text-sm leading-relaxed text-muted">
          A house built on quiet craft and considered detail.
        </p>
      </section>

      {/* The House */}
      <section id="house" className="border-t border-line px-6 py-20 sm:px-12">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-[family-name:var(--font-display)] text-3xl">
            The House
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-muted">
            Maison Sottovoce is being shaped with intention. Our collections,
            our story, and our craft will be revealed here in time. Until then,
            we work — quietly.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer
        id="contact"
        className="border-t border-line px-6 py-10 text-center text-xs uppercase tracking-[0.18em] text-muted sm:px-12"
      >
        <p>
          For enquiries:{" "}
          <a
            className="text-foreground transition-colors hover:text-accent"
            href="mailto:hello@maisonsottovoce.com"
          >
            hello@maisonsottovoce.com
          </a>
        </p>
        <p className="mt-4 normal-case tracking-normal">
          © {new Date().getFullYear()} Maison Sottovoce. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
