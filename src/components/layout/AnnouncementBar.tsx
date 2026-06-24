export function AnnouncementBar({
  text = "Complimentary Shipping on All U.S. Orders",
  enabled = true,
}: {
  text?: string;
  enabled?: boolean;
}) {
  if (!enabled || !text.trim()) return null;
  return (
    <div className="bg-ink text-ivory">
      <p className="mx-auto max-w-[1400px] px-4 py-2.5 text-center text-[0.66rem] uppercase tracking-[0.28em]">
        {text}
      </p>
    </div>
  );
}
