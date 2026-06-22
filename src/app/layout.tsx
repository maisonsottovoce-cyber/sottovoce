import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { ChromeGate } from "@/components/layout/ChromeGate";
import { getSiteSettings } from "@/lib/catalog";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Maison SOTTOVOCE | For every entrance worth remembering",
    template: "%s | Maison SOTTOVOCE",
  },
  description:
    "A premium women's fashion maison creating effortless silhouettes for entrances, evenings, and occasions worth remembering.",
  openGraph: {
    title: "Maison SOTTOVOCE",
    description:
      "Effortless silhouettes for entrances, evenings, and occasions worth remembering.",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-ivory">
        <WishlistProvider>
          <CartProvider>
            <ChromeGate
              announcement={{
                text: settings.announcementText,
                enabled: settings.announcementEnabled,
              }}
            >
              {children}
            </ChromeGate>
          </CartProvider>
        </WishlistProvider>
      </body>
    </html>
  );
}
