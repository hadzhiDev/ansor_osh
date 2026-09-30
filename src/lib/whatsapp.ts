import { shopConfig } from "@/config/shop";
import { formatPrice } from "@/lib/format";
import { Product } from "@/catalog/products";

export type OrderLine = {
  product: Product;
  quantity: number;
  lineTotal: number;
};

export type CustomerDetails = {
  name: string;
  phone: string;
  address: string;
  note?: string;
};

export function buildWhatsappOrderUrl(
  lines: OrderLine[],
  totalPrice: number,
  customer: CustomerDetails
): string {
  const itemsText = lines
    .map(
      (l, idx) =>
        `${idx + 1}. ${l.product.name} x${l.quantity} — ${formatPrice(l.lineTotal)}`
    )
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
