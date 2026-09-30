import { shopConfig } from "@/config/shop";

export function formatPrice(amount: number): string {
  return (
    new Intl.NumberFormat(shopConfig.currencyLocale, {
      maximumFractionDigits: 0,
    }).format(amount) +
    " " +
    shopConfig.currency
  );
}
