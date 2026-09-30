"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";
import { useUi } from "@/lib/ui-context";
import { formatPrice } from "@/lib/format";
import { buildWhatsappOrderUrl } from "@/lib/whatsapp";
import { isValidKgPhone } from "@/lib/phone";
import {
  CartIcon,
  ChatIcon,
  CloseIcon,
  MinusIcon,
  PlusIcon,
  TrashIcon,
} from "@/components/icons";

export default function CartDrawer() {
  const {
    lines,
    totalPrice,
    totalCount,
    addItem,
    decreaseItem,
    removeItem,
    clearCart,
  } = useCart();
  const { isCartOpen, closeCart } = useUi();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [showCheckout, setShowCheckout] = useState(false);
  const [error, setError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  function handleSendOrder() {
    if (!name.trim() || !phone.trim() || !address.trim()) {
      setError("Пожалуйста, укажите имя, телефон и адрес.");
      return;
    }
    if (!isValidKgPhone(phone)) {
      setError("");
      setPhoneError("Введите корректный номер, например +996 700 123 456");
      return;
    }
    if (lines.length === 0) {
      setError("Ваша корзина пуста.");
      return;
    }
    setError("");
    setPhoneError("");

    const url = buildWhatsappOrderUrl(lines, totalPrice, {
      name,
      phone,
      address,
      note,
    });

    window.open(url, "_blank", "noopener,noreferrer");
  }

  const inputClass =
    "w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition focus:border-brand";

  return (
    <>
      {/* Overlay */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity ${
          isCartOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-surface shadow-lg transition-transform ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-label="Корзина"
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-lg font-extrabold">
            Корзина {totalCount > 0 && `(${totalCount})`}
          </h2>
          <button
            onClick={closeCart}
            className="grid h-9 w-9 place-items-center rounded-full text-muted transition hover:bg-background"
            aria-label="Закрыть корзину"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {lines.length === 0 ? (
            <div className="mt-16 flex flex-col items-center text-center">
              <CartIcon className="h-12 w-12 text-muted" strokeWidth={1.5} />
              <p className="mt-3 font-semibold">Ваша корзина пуста</p>
              <p className="mt-1 text-sm text-muted">
                Добавьте товары из каталога.
              </p>
            </div>
          ) : (
            <ul className="flex flex-col gap-3">
              {lines.map((line) => (
                <li
                  key={line.product.id}
                  className="flex items-center gap-3 rounded-2xl border border-border p-3"
                >
                  <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-brand-tint">
                    <Image
                      src={line.product.image}
                      alt={line.product.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold">{line.product.name}</p>
                    <p className="text-sm text-muted">
                      {formatPrice(line.product.price)}
                    </p>
                    <button
                      onClick={() => removeItem(line.product.id)}
                      className="mt-0.5 inline-flex items-center gap-1 text-xs text-accent hover:underline"
                    >
                      <TrashIcon className="h-3.5 w-3.5" />
                      Удалить
                    </button>
                  </div>
                  <div className="flex items-center gap-1 rounded-full bg-brand-tint p-1">
                    <button
                      onClick={() => decreaseItem(line.product.id)}
                      className="grid h-7 w-7 place-items-center rounded-full bg-surface text-brand shadow-sm transition active:scale-90"
                      aria-label={`Уменьшить ${line.product.name}`}
                    >
                      <MinusIcon className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-5 text-center text-sm font-bold tabular-nums">
                      {line.quantity}
                    </span>
                    <button
                      onClick={() => addItem(line.product.id)}
                      className="grid h-7 w-7 place-items-center rounded-full bg-brand text-white shadow-sm transition active:scale-90"
                      aria-label={`Увеличить ${line.product.name}`}
                    >
                      <PlusIcon className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {showCheckout && lines.length > 0 && (
            <div className="mt-6 flex flex-col gap-3">
              <h3 className="font-bold">Данные для доставки</h3>
              <input
                type="text"
                placeholder="Имя *"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
              />
              <div>
                <input
                  type="tel"
                  inputMode="tel"
                  placeholder="Номер телефона (+996 ...) *"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (phoneError) setPhoneError("");
                  }}
                  className={`${inputClass} ${
                    phoneError ? "border-accent focus:border-accent" : ""
                  }`}
                  aria-invalid={phoneError ? true : undefined}
                />
                {phoneError && (
                  <p className="mt-1 text-xs text-accent">{phoneError}</p>
                )}
              </div>
              <textarea
                placeholder="Адрес доставки *"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={2}
                className={`${inputClass} resize-none`}
              />
              <textarea
                placeholder="Комментарий (необязательно)"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={2}
                className={`${inputClass} resize-none`}
              />
              {error && <p className="text-sm text-accent">{error}</p>}
            </div>
          )}
        </div>

        {lines.length > 0 && (
          <div className="border-t border-border p-5">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-muted">Итого</span>
              <span className="text-xl font-extrabold tabular-nums">
                {formatPrice(totalPrice)}
              </span>
            </div>

            {!showCheckout ? (
              <button
                onClick={() => setShowCheckout(true)}
                className="w-full rounded-full bg-brand py-3.5 font-semibold text-white transition hover:bg-brand-dark active:scale-[0.99]"
              >
                Оформить заказ
              </button>
            ) : (
              <button
                onClick={handleSendOrder}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-brand py-3.5 font-semibold text-white transition hover:bg-brand-dark active:scale-[0.99]"
              >
                <ChatIcon className="h-5 w-5" />
                Отправить заказ в WhatsApp
              </button>
            )}

            <button
              onClick={clearCart}
              className="mt-2 w-full py-2 text-sm text-muted transition hover:text-foreground"
            >
              Очистить корзину
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
