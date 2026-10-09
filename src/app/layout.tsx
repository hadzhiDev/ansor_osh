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

const siteTitle = `${shopConfig.name} — Заказ онлайн`;
const siteDescription = `Копчёная рыба, деликатесы и натуральные продукты. Выбирайте товары и заказывайте в ${shopConfig.name} через WhatsApp.`;

export const metadata: Metadata = {
  // Задайте домен сайта через переменную окружения NEXT_PUBLIC_SITE_URL
  // (например NEXT_PUBLIC_SITE_URL=https://ansor-osh.kg), чтобы превью
  // корректно отображалось при отправке ссылки в WhatsApp/соцсетях.
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    type: "website",
    locale: "ru_RU",
    siteName: shopConfig.name,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${shopConfig.name} — рыба, мясные деликатесы и натуральные продукты`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og-image.jpg"],
  },
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
