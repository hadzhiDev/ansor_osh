"use client";

import { useMemo, useState } from "react";
import { categories, products } from "@/catalog/products";
import ProductCard from "@/components/ProductCard";
import { SearchIcon } from "@/components/icons";

const ALL = "Все";

export default function ProductGrid() {
  const [activeCategory, setActiveCategory] = useState<string>(ALL);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const matchesCategory =
        activeCategory === ALL || p.category === activeCategory;
      const matchesQuery =
        q === "" ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  return (
    <div className="flex flex-col">
      {/* Search */}
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

      {/* Sticky category chips */}
      <div className="sticky top-[65px] z-20 mt-4 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="no-scrollbar mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-3">
          {[ALL, ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                activeCategory === cat
                  ? "bg-brand text-white"
                  : "bg-surface text-foreground ring-1 ring-border hover:ring-brand"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products */}
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
