import type { Metadata } from "next";
import { CartView } from "@/components/commerce/CartView";

export const metadata: Metadata = {
  title: "Your Bag",
  description: "Review the pieces in your bag and proceed to checkout.",
};

export default function CartPage() {
  return <CartView />;
}
