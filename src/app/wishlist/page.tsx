import type { Metadata } from "next";
import { WishlistView } from "@/components/commerce/WishlistView";

export const metadata: Metadata = {
  title: "Wishlist",
  description: "The pieces you're considering for the next entrance.",
};

export default function WishlistPage() {
  return <WishlistView />;
}
