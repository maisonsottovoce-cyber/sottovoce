import type { Metadata } from "next";
import { PageHero } from "@/components/content/PageHero";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Account",
  description: "Sign in to your Maison SOTTOVOCE account.",
};

export default function AccountPage() {
  return (
    <>
      <PageHero
        kicker="The Maison"
        title="Your Account"
        label="Boutique Hotel Editorial"
        tone="charcoal"
        height="sm"
      />
      <div className="mx-auto max-w-md px-6 py-20 text-center">
        <p className="body-copy">
          Accounts, order tracking, and private client services are arriving soon. In the
          meantime, your bag and wishlist are saved on this device.
        </p>
        <div className="mt-8 flex flex-col gap-3">
          <Button href="/wishlist" variant="outline">
            View Wishlist
          </Button>
          <Button href="/contact" variant="link" className="mx-auto">
            Contact a Personal Stylist
          </Button>
        </div>
      </div>
    </>
  );
}
