"use client";

import { useId, useState, type ReactNode } from "react";
import { cx } from "@/lib/format";
import { PlusIcon, MinusIcon } from "./icons";

export function AccordionItem({
  title,
  children,
  defaultOpen = false,
  dark = false,
}: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  dark?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();
  return (
    <div className={cx("border-b", dark ? "border-line-dark" : "border-line")}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
        className={cx(
          "flex w-full items-center justify-between gap-4 py-5 text-left small-caps",
          dark ? "text-ivory" : "text-ink",
        )}
      >
        <span>{title}</span>
        {open ? (
          <MinusIcon width={16} height={16} className="shrink-0" />
        ) : (
          <PlusIcon width={16} height={16} className="shrink-0" />
        )}
      </button>
      <div
        id={panelId}
        hidden={!open}
        className={cx("body-copy pb-6 text-sm", dark && "text-muted-dark")}
      >
        {children}
      </div>
    </div>
  );
}

export function Accordion({ children }: { children: ReactNode }) {
  return <div className="w-full">{children}</div>;
}
