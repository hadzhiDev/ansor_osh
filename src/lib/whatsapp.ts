import { shopConfig } from "@/config/shop";
import { formatPrice } from "@/lib/format";
import { CartLine } from "@/lib/cart-context";

export type OrderLine = CartLine;

const num = (n: number, digits: number) =>
  n.toLocaleString("ru-RU", { maximumFractionDigits: digits });

// Примерное количество при покупке «на сумму», с единицей:
// 1000 сом при 1800 сом/кг → "560 г", 3000 сом → "1,67 кг", 300 сом/л → "560 мл".
export function approxQuantity(
  amount: number,
  price: number,
  unit?: string,
): string {
  if (price <= 0 || amount <= 0) return "";
  const q = amount / price;
  if (unit === "кг" || unit === "л") {
    if (q < 1) {
      const small = Math.round((q * 1000) / 10) * 10;
      return `${small} ${unit === "кг" ? "г" : "мл"}`;
    }
    return `${num(q, 2)} ${unit}`;
  }
  return unit ? `${num(q, 1)} × ${unit}` : num(q, 1);
}

export type CustomerDetails = {
  name: string;
  phone: string;
  address: string;
  note?: string;
};

export function buildWhatsappOrderUrl(
  lines: OrderLine[],
  totalPrice: number,
  customer: CustomerDetails,
): string {
  const itemsText = lines
    .map((l, idx) => {
      const unit = l.product.unit ? ` ${l.product.unit}` : "";
      if (l.amount !== undefined) {
        const approx = approxQuantity(
          l.amount,
          l.product.price,
          l.product.unit,
        );
        return `${idx + 1}. ${l.product.name} — на сумму ${formatPrice(l.amount)}${approx ? ` (≈ ${approx})` : ""}`;
      }
      return `${idx + 1}. ${l.product.name} × ${l.quantity}${unit} — ${formatPrice(l.lineTotal)}`;
    })
    .join("\n");

  const messageParts = [
    `Новый заказ с сайта ${shopConfig.name}`,
    "",
    itemsText,
    "",
    `Итого: ${formatPrice(totalPrice)}`,
    "",
    `Имя: ${customer.name}`,
    `Телефон: ${customer.phone}`,
    `Адрес: ${customer.address}`,
  ];

  if (customer.note && customer.note.trim().length > 0) {
    messageParts.push(`Комментарий: ${customer.note.trim()}`);
  }

  const message = messageParts.join("\n");
  const encoded = encodeURIComponent(message);
  const number = shopConfig.whatsappNumber.replace(/\D/g, "");

  return `https://wa.me/${number}?text=${encoded}`;
}
