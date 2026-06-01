import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cx } from "@/lib/format";

type Variant = "solid" | "outline" | "outlineDark" | "cream" | "link";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 nav-link transition-colors duration-300 disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  solid: "bg-ink text-ivory hover:bg-purple",
  outline: "border border-ink/30 text-ink hover:border-ink hover:bg-ink hover:text-ivory",
  outlineDark: "border border-ivory/40 text-ivory hover:bg-ivory hover:text-ink",
  cream: "bg-cream text-ink hover:bg-ivory",
  link: "text-ink hover:text-purple link-underline",
};

const sizes: Record<Size, string> = {
  sm: "px-5 py-2.5 text-[0.66rem]",
  md: "px-7 py-3.5",
  lg: "px-9 py-4",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps & {
  href: string;
  external?: boolean;
};

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const variant = props.variant ?? "solid";
  const size = props.size ?? "md";
  const classes = cx(
    base,
    variants[variant],
    variant !== "link" && sizes[size],
    props.className,
  );

  if ("href" in props && props.href) {
    if (props.external) {
      return (
        <a className={classes} href={props.href} target="_blank" rel="noreferrer">
          {props.children}
        </a>
      );
    }
    return (
      <Link className={classes} href={props.href}>
        {props.children}
      </Link>
    );
  }

  // Strip non-DOM props before spreading onto the button element.
  const rest: Record<string, unknown> = { ...props };
  delete rest.variant;
  delete rest.size;
  delete rest.className;
  delete rest.children;

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {props.children}
    </button>
  );
}
