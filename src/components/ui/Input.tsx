import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cx } from "@/lib/format";

const fieldBase =
  "w-full bg-transparent border-b border-line px-0 py-3 text-sm text-ink placeholder:text-muted/70 focus:border-purple focus:outline-none transition-colors";

export function Input({
  label,
  className,
  id,
  dark = false,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label?: string; dark?: boolean }) {
  return (
    <div className="w-full">
      {label ? (
        <label htmlFor={id} className="small-caps mb-1 block text-muted">
          {label}
        </label>
      ) : null}
      <input
        id={id}
        className={cx(
          fieldBase,
          dark && "border-line-dark text-ivory placeholder:text-muted-dark",
          className,
        )}
        {...props}
      />
    </div>
  );
}

export function Textarea({
  label,
  className,
  id,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string }) {
  return (
    <div className="w-full">
      {label ? (
        <label htmlFor={id} className="small-caps mb-1 block text-muted">
          {label}
        </label>
      ) : null}
      <textarea id={id} className={cx(fieldBase, "resize-none", className)} {...props} />
    </div>
  );
}
