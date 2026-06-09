"use client";

import { useTransition } from "react";

export function DeleteButton({ onConfirm }: { onConfirm: () => Promise<void> }) {
  const [pending, startTransition] = useTransition();
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (confirm("Delete this dress? This cannot be undone.")) {
          startTransition(() => {
            void onConfirm();
          });
        }
      }}
      className="small-caps text-muted transition-colors hover:text-purple disabled:opacity-50"
    >
      {pending ? "Deleting…" : "Delete"}
    </button>
  );
}
