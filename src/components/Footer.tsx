import { shopConfig } from "@/config/shop";
import { ChatIcon, FishIcon } from "@/components/icons";

export default function Footer() {
  const waNumber = shopConfig.whatsappNumber.replace(/\D/g, "");

  return (
    <footer className="mt-8 border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-brand text-white">
              <FishIcon />
            </span>
            <span className="text-lg font-extrabold">{shopConfig.name}</span>
          </div>
          <p className="mt-3 text-sm text-muted">
            Копчёная рыба, деликатесы и натуральные продукты с доставкой.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-bold">Как заказать</h4>
          <ol className="mt-3 space-y-1.5 text-sm text-muted">
            <li>1. Добавьте товары в корзину</li>
            <li>2. Заполните данные для доставки</li>
            <li>3. Отправьте заказ в WhatsApp</li>
          </ol>
        </div>

        <div>
          <h4 className="text-sm font-bold">Контакты</h4>
          <a
            href={`https://wa.me/${waNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark"
          >
            <ChatIcon className="h-4 w-4" />
            Написать в WhatsApp
          </a>
        </div>
      </div>

      <div className="border-t border-border py-4 text-center text-xs text-muted">
        © {new Date().getFullYear()} {shopConfig.name}. Все права защищены.
      </div>
    </footer>
  );
}
