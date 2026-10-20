"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";

// Снимок товара, сохраняемый в корзине (не зависит от загрузки каталога).
export type CartProduct = {
  id: number;
  name: string;
  price: number;
  unit?: string;
  image: string | null;
};

// amount — покупка «на сумму» (сом). Если задано, считается вместо price × quantity.
export type CartItem = {
  product: CartProduct;
  quantity: number;
  amount?: number;
};

export type CartLine = {
  product: CartProduct;
  quantity: number;
  amount?: number;
  lineTotal: number;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (product: CartProduct) => void;
  removeItem: (productId: number) => void;
  decreaseItem: (productId: number) => void;
  setAmount: (productId: number, amount: number | undefined) => void;
  syncCatalog: (products: CartProduct[]) => void;
  clearCart: () => void;
  totalCount: number;
  totalPrice: number;
  lines: CartLine[];
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = "ansor-osh-cart";

function isValidItem(x: unknown): x is CartItem {
  if (!x || typeof x !== "object") return false;
  const item = x as Record<string, unknown>;
  const p = item.product as Record<string, unknown> | undefined;
  return (
    typeof item.quantity === "number" &&
    !!p &&
    typeof p.id === "number" &&
    typeof p.name === "string" &&
    typeof p.price === "number" &&
    (item.amount === undefined || typeof item.amount === "number")
  );
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  // Актуальный каталог: корзина в localStorage хранит снимки, которые могли
  // устареть (цена, единица) — при выводе подставляем свежие данные.
  const [catalog, setCatalog] = useState<Map<number, CartProduct>>(new Map());

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.every(isValidItem)) {
          setItems(parsed);
        }
      }
    } catch {
      // игнорируем повреждённые/устаревшие данные
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // приватный режим и т.п.
    }
  }, [items, hydrated]);

  function addItem(product: CartProduct) {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        // Обновляем снимок товара (цена/единица могли измениться) и
        // выходим из режима «на сумму» — кнопки +/- работают с количеством.
        return prev.map((i) =>
          i.product.id === product.id
            ? {
                product,
                quantity: i.amount === undefined ? i.quantity + 1 : i.quantity,
              }
            : i,
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  }

  function decreaseItem(productId: number) {
    setItems((prev) =>
      prev
        .map((i) =>
          i.product.id === productId
            ? {
                product: i.product,
                quantity: i.amount === undefined ? i.quantity - 1 : i.quantity,
              }
            : i,
        )
        .filter((i) => i.quantity > 0),
    );
  }

  function setAmount(productId: number, amount: number | undefined) {
    setItems((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, amount } : i)),
    );
  }

  function removeItem(productId: number) {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  }

  function syncCatalog(products: CartProduct[]) {
    setCatalog(new Map(products.map((p) => [p.id, p])));
  }

  function clearCart() {
    setItems([]);
  }

  const lines: CartLine[] = useMemo(
    () =>
      items.map((item) => {
        const product = catalog.get(item.product.id) ?? item.product;
        return {
          product,
          quantity: item.quantity,
          amount: item.amount,
          lineTotal:
            item.amount !== undefined
              ? item.amount
              : product.price * item.quantity,
        };
      }),
    [items, catalog],
  );

  const totalCount = lines.reduce(
    (sum, l) => sum + (l.amount !== undefined ? 1 : l.quantity),
    0,
  );
  const totalPrice = lines.reduce((sum, l) => sum + l.lineTotal, 0);

  const value: CartContextValue = {
    items,
    addItem,
    removeItem,
    decreaseItem,
    setAmount,
    syncCatalog,
    clearCart,
    totalCount,
    totalPrice,
    lines,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
