"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { Product, products } from "@/catalog/products";

export type CartItem = {
  productId: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  decreaseItem: (productId: string) => void;
  clearCart: () => void;
  totalCount: number;
  totalPrice: number;
  lines: { product: Product; quantity: number; lineTotal: number }[];
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = "ansor-osh-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setItems(JSON.parse(raw));
      }
    } catch {
      // ignore corrupted storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore write failures (e.g. private browsing)
    }
  }, [items, hydrated]);

  function addItem(productId: string) {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === productId);
      if (existing) {
        return prev.map((i) =>
          i.productId === productId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { productId, quantity: 1 }];
    });
  }

  function decreaseItem(productId: string) {
    setItems((prev) =>
      prev
        .map((i) =>
          i.productId === productId ? { ...i, quantity: i.quantity - 1 } : i
        )
        .filter((i) => i.quantity > 0)
    );
  }

  function removeItem(productId: string) {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }

  function clearCart() {
    setItems([]);
  }

  const lines = useMemo(
    () =>
      items
        .map((item) => {
          const product = products.find((p) => p.id === item.productId);
          if (!product) return null;
          return {
            product,
            quantity: item.quantity,
            lineTotal: product.price * item.quantity,
          };
        })
        .filter((line): line is { product: Product; quantity: number; lineTotal: number } => line !== null),
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
