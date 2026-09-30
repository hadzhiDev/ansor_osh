import Image from "next/image";
import { shopConfig } from "@/config/shop";
import { TruckIcon } from "@/components/icons";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[260px] w-full sm:h-[340px]">
        <Image
          src="/header.jpg"
          alt="Свежая рыба и морепродукты"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/10" />

        <div className="absolute inset-0">
          <div className="mx-auto flex h-full max-w-6xl flex-col justify-center px-4">
            <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
              <TruckIcon className="h-4 w-4" />
              Доставка по Ошу
            </span>
            <h1 className="max-w-xl text-3xl font-extrabold leading-tight text-white sm:text-5xl">
              {shopConfig.name}
            </h1>
            <p className="mt-2 max-w-md text-sm text-white/90 sm:text-lg">
              Копчёная рыба, деликатесы и натуральные продукты. Свежее — прямо к
              вашему столу.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
