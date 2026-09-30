import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { shopConfig } from "@/config/shop";
import { CartProvider } from "@/lib/cart-context";
import { UiProvider } from "@/lib/ui-context";
import Header from "@/components/Header";
import CartDrawer from "@/components/CartDrawer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${shopConfig.name} — Заказ онлайн`,
  description: `Выбирайте товары и заказывайте в ${shopConfig.name} через WhatsApp.`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <UiProvider>
          <CartProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <CartDrawer />
          </CartProvider>
        </UiProvider>
      </body>
    </html>
  );
}
