"use client";

import { shopConfig } from "@/config/shop";
import { useCart } from "@/lib/cart-context";
import { useUi } from "@/lib/ui-context";
import { formatPrice } from "@/lib/format";
import { CartIcon, FishIcon } from "@/components/icons";

export default function Header() {
  const { totalCount, totalPrice } = useCart();
  const { openCart } = useUi();

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-surface/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <a href="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-brand text-white">
            <FishIcon />
          </span>
          <span className="text-lg font-extrabold tracking-tight">
            {shopConfig.name}
          </span>
        </a>

        <button
          onClick={openCart}
          className="group flex items-center gap-2 rounded-full bg-brand px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-brand-dark active:scale-[0.98]"
        >
          <CartIcon className="h-5 w-5" />
          {totalCount > 0 ? (
            <span className="tabular-nums">{formatPrice(totalPrice)}</span>
          ) : (
            <span>Корзина</span>
          )}
          {totalCount > 0 && (
            <span className="grid h-5 min-w-5 place-items-center rounded-full bg-white px-1 text-xs font-bold text-brand">
              {totalCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
