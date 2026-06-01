import { cx } from "@/lib/format";

export function Divider({
  className,
  dark = false,
}: {
  className?: string;
  dark?: boolean;
}) {
  return (
    <hr
      className={cx("border-0 h-px w-full", dark ? "bg-line-dark" : "bg-line", className)}
    />
  );
}
