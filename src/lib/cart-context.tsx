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

export type CartItem = {
  product: CartProduct;
  quantity: number;
};

type CartLine = {
  product: CartProduct;
  quantity: number;
  lineTotal: number;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (product: CartProduct) => void;
  removeItem: (productId: number) => void;
  decreaseItem: (productId: number) => void;
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
    typeof p.price === "number"
  );
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

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
        return prev.map((i) =>
          i.product.id === product.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
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
            ? { ...i, quantity: i.quantity - 1 }
            : i
        )
        .filter((i) => i.quantity > 0)
    );
  }

  function removeItem(productId: number) {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  }

  function clearCart() {
    setItems([]);
  }

  const lines: CartLine[] = useMemo(
    () =>
      items.map((item) => ({
        product: item.product,
        quantity: item.quantity,
        lineTotal: item.product.price * item.quantity,
      })),
    [items]
  );

  const totalCount = lines.reduce((sum, l) => sum + l.quantity, 0);
  const totalPrice = lines.reduce((sum, l) => sum + l.lineTotal, 0);

  const value: CartContextValue = {
    items,
    addItem,
    removeItem,
    decreaseItem,
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
