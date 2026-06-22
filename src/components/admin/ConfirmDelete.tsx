"use client";

import { useTransition } from "react";

export function ConfirmDelete({
  onConfirm,
  message = "Delete this item? This cannot be undone.",
  label = "Delete",
}: {
  onConfirm: () => Promise<void>;
  message?: string;
  label?: string;
}) {
  const [pending, startTransition] = useTransition();
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (confirm(message)) {
          startTransition(() => {
            void onConfirm();
          });
        }
      }}
      className="small-caps text-muted transition-colors hover:text-purple disabled:opacity-50"
    >
      {pending ? "Deleting…" : label}
    </button>
  );
}
