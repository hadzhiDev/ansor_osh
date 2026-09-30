"use client";

import Image from "next/image";
import { Product } from "@/catalog/products";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/format";
import { PlusIcon, MinusIcon } from "@/components/icons";

export default function ProductCard({ product }: { product: Product }) {
  const { items, addItem, decreaseItem } = useCart();
  const inCart = items.find((i) => i.productId === product.id);

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl bg-surface shadow-sm ring-1 ring-border transition-all hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand-tint">
        <Image
          src={product.image}
          alt={product.name}
          fill
          placeholder="blur"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-foreground shadow-sm backdrop-blur">
          {product.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-bold leading-snug">{product.name}</h3>
        <p className="mt-1 flex-1 text-sm text-muted">{product.description}</p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-extrabold tabular-nums">
            {formatPrice(product.price)}
          </span>

          {inCart ? (
            <div className="flex items-center gap-1 rounded-full bg-brand-tint p-1">
              <button
                onClick={() => decreaseItem(product.id)}
                className="grid h-8 w-8 place-items-center rounded-full bg-surface text-brand shadow-sm transition active:scale-90"
                aria-label={`Уменьшить ${product.name}`}
              >
                <MinusIcon className="h-4 w-4" />
              </button>
              <span className="w-6 text-center font-bold tabular-nums">
                {inCart.quantity}
              </span>
              <button
                onClick={() => addItem(product.id)}
                className="grid h-8 w-8 place-items-center rounded-full bg-brand text-white shadow-sm transition active:scale-90"
                aria-label={`Увеличить ${product.name}`}
              >
                <PlusIcon className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => addItem(product.id)}
              className="flex items-center gap-1.5 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-brand-dark active:scale-95"
            >
              <PlusIcon className="h-4 w-4" />
              <span>В корзину</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
