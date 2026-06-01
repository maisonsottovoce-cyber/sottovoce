import { cx } from "@/lib/format";

export function Badge({
  children,
  tone = "light",
  className,
}: {
  children: React.ReactNode;
  tone?: "light" | "dark" | "purple";
  className?: string;
}) {
  const tones = {
    light: "bg-ivory/90 text-ink",
    dark: "bg-ink/85 text-ivory",
    purple: "bg-purple text-ivory",
  } as const;
  return (
    <span
      className={cx(
        "small-caps inline-block px-2.5 py-1 backdrop-blur-sm",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
