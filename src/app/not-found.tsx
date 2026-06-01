import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-xl flex-col items-center gap-5 px-6 py-32 text-center">
      <span className="brand-kicker text-purple">404</span>
      <h1 className="editorial-heading text-4xl sm:text-5xl">This page slipped away quietly.</h1>
      <p className="body-copy max-w-md">
        The page you&apos;re looking for can&apos;t be found. Let us show you back to the Maison.
      </p>
      <Link
        href="/"
        className="nav-link mt-2 bg-ink px-8 py-4 text-ivory transition-colors hover:bg-purple"
      >
        Return Home
      </Link>
    </section>
  );
}
