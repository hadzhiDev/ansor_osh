import type { StaticImageData } from "next/image";

// ─────────────────────────────────────────────────────────────
// КАК ДОБАВИТЬ НОВЫЙ ТОВАР
// 1. Положите картинку в эту же папку (src/catalog/), например: my-fish.jpg
// 2. Импортируйте её ниже:      import myFish from "./my-fish.jpg";
// 3. Добавьте запись в массив products с этой картинкой в поле image.
// Категория должна быть одной из списка `categories` ниже.
// ─────────────────────────────────────────────────────────────

import smokedMackerel from "./smoked-mackerel.jpg";
import smokedRedFishFillet from "./smoked-red-fish-fillet.jpg";
import smokedSalmonFillet from "./smoked-salmon-fillet.jpg";
import wholeSmokedRedFish from "./whole-smoked-red-fish.jpg";
import spicyFishFillet from "./spicy-fish-fillet.jpg";
import smokedChickenLegs from "./smoked-chicken-legs.jpg";
import chlorophyllShots from "./chlorophyll-shots.jpg";
import appleCiderVinegar from "./apple-cider-vinegar.jpg";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: StaticImageData;
};

export const categories = [
  "Копчёная рыба",
  "Копчёное мясо",
  "Натуральные продукты",
] as const;

export const products: Product[] = [
  {
    id: "smoked-mackerel",
    name: "Копчёная скумбрия",
    description: "Целое филе скумбрии холодного копчения, с надрезами.",
    price: 420,
    category: "Копчёная рыба",
    image: smokedMackerel,
  },
  {
    id: "smoked-red-fish-fillet",
    name: "Филе красной рыбы",
    description: "Нежное копчёное филе горбуши, порционные кусочки.",
    price: 890,
    category: "Копчёная рыба",
    image: smokedRedFishFillet,
  },
  {
    id: "smoked-salmon-fillet",
    name: "Филе лосося",
    description: "Насыщенное филе лосося горячего копчения, готово к подаче.",
    price: 1050,
    category: "Копчёная рыба",
    image: smokedSalmonFillet,
  },
  {
    id: "whole-smoked-red-fish",
    name: "Красная рыба целиком",
    description: "Целая копчёная красная рыба, нарезанная для подачи.",
    price: 1350,
    category: "Копчёная рыба",
    image: wholeSmokedRedFish,
  },
  {
    id: "spicy-fish-fillet",
    name: "Острое маринованное филе",
    description: "Копчёное филе рыбы в паприке, с пикантной остринкой.",
    price: 690,
    category: "Копчёная рыба",
    image: spicyFishFillet,
  },
  {
    id: "smoked-chicken-legs",
    name: "Копчёные куриные окорочка",
    description: "Сочные копчёные куриные окорочка (Halisa), в вакууме.",
    price: 380,
    category: "Копчёное мясо",
    image: smokedChickenLegs,
  },
  {
    id: "chlorophyll-shots",
    name: "Хлорофилл Vitgrass",
    description:
      "Свежие оздоровительные шоты из жидкого хлорофилла, в подарочной сумке.",
    price: 520,
    category: "Натуральные продукты",
    image: chlorophyllShots,
  },
  {
    id: "apple-cider-vinegar",
    name: "Натуральный яблочный уксус 5%",
    description: "Натуральный сладкий яблочный уксус естественного брожения.",
    price: 270,
    category: "Натуральные продукты",
    image: appleCiderVinegar,
  },
];
