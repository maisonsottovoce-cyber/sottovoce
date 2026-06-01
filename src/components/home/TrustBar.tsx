import {
  TruckIcon,
  ReturnIcon,
  LockIcon,
  StylistIcon,
} from "@/components/ui/icons";

const items = [
  { icon: TruckIcon, title: "Complimentary Shipping", note: "On all U.S. orders" },
  { icon: ReturnIcon, title: "Easy Returns", note: "Within 30 days" },
  { icon: LockIcon, title: "Secure Payments", note: "Encrypted checkout" },
  { icon: StylistIcon, title: "Personal Stylist", note: "By appointment" },
];

export function TrustBar() {
  return (
    <section className="border-y border-line bg-ivory">
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-y-10 px-6 py-12 md:grid-cols-4">
        {items.map(({ icon: Icon, title, note }) => (
          <div key={title} className="flex flex-col items-center gap-3 text-center">
            <Icon width={26} height={26} className="text-ink" />
            <div>
              <p className="small-caps text-ink">{title}</p>
              <p className="mt-1 text-xs text-muted">{note}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
