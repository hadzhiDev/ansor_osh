"use client";

import { useEffect, useMemo, useState } from "react";
import { Product, Category } from "@/lib/types";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/lib/cart-context";
import { SearchIcon } from "@/components/icons";

type Props = {
  products: Product[];
  categories: Category[];
};

export default function ProductGrid({ products, categories }: Props) {
  // null = «Все»
  const [activeId, setActiveId] = useState<number | null>(null);
  const [query, setQuery] = useState("");
  const { syncCatalog } = useCart();

  useEffect(() => {
    syncCatalog(
      products.map((p) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        unit: p.unit,
        image: p.image,
      }))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const matchesCategory = activeId === null || p.categoryId === activeId;
      const matchesQuery =
        q === "" ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [products, activeId, query]);

  // Каталог пуст — бэкенд не подключён или товаров ещё нет.
  if (products.length === 0) {
    return (
      <div className="mx-auto w-full max-w-6xl px-4 py-20 text-center">
        <p className="text-lg font-semibold">Товары скоро появятся</p>
        <p className="mt-1 text-muted">
          Каталог обновляется. Загляните чуть позже.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Поиск */}
      <div className="mx-auto -mt-6 w-full max-w-6xl px-4">
        <div className="relative">
          <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск товаров…"
            className="w-full rounded-full border border-border bg-surface py-3.5 pl-11 pr-4 text-sm shadow-md outline-none transition focus:border-brand"
          />
        </div>
      </div>

      {/* Категории */}
      {categories.length > 0 && (
        <div className="sticky top-[65px] z-20 mt-4 border-b border-border bg-background/90 backdrop-blur-md">
          <div className="no-scrollbar mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-3">
            <button
              onClick={() => setActiveId(null)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                activeId === null
                  ? "bg-brand text-white"
                  : "bg-surface text-foreground ring-1 ring-border hover:ring-brand"
              }`}
            >
              Все
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveId(cat.id)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  activeId === cat.id
                    ? "bg-brand text-white"
                    : "bg-surface text-foreground ring-1 ring-border hover:ring-brand"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Товары */}
      <div className="mx-auto w-full max-w-6xl px-4 py-6">
        {filtered.length === 0 ? (
          <p className="py-16 text-center text-muted">Ничего не найдено.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
