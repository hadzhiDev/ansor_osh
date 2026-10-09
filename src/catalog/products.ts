import type { StaticImageData } from "next/image";

// ─────────────────────────────────────────────────────────────
// Названия, описания и цены заполнены.
// price — число, unit — единица измерения ("кг", "шт", "литр", "0.5 л").
// Категории в массиве `categories` задают порядок фильтр-чипсов.
//
// ДОБАВИТЬ ТОВАР: положите картинку в src/catalog/, импортируйте ниже,
// добавьте запись в products (name, description, price, unit, category, image).
// ─────────────────────────────────────────────────────────────

import product01 from "./product-01.jpg";
import product02 from "./product-02.jpg";
import product03 from "./product-03.jpg";
import product04 from "./product-04.jpg";
import product05 from "./product-05.jpg";
import product06 from "./product-06.jpg";
import product07 from "./product-07.jpg";
import product08 from "./product-08.jpg";
import product09 from "./product-09.jpg";
import product10 from "./product-10.jpg";
import product11 from "./product-11.jpg";
import product12 from "./product-12.jpg";
import product13 from "./product-13.jpg";
import product14 from "./product-14.jpg";
import product15 from "./product-15.jpg";
import product16 from "./product-16.jpg";
import product17 from "./product-17.jpg";
import product18 from "./product-18.jpg";
import product19 from "./product-19.jpg";
import product20 from "./product-20.jpg";
import product21 from "./product-21.jpg";
import product22 from "./product-22.jpg";
import product23 from "./product-23.jpg";
import product24 from "./product-24.jpg";
import product25 from "./product-25.jpg";
import product26 from "./product-26.jpg";
import product27 from "./product-27.jpg";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  unit?: string;
  category?: string;
  image: StaticImageData;
};

export const categories: string[] = [
  "Рыба",
  "Копчёное мясо",
  "Колбасы и сосиски",
  "Молочные продукты",
  "Уксусы",
  "Рамен и лапша",
];

export const products: Product[] = [
  {
    id: "product-01",
    name: "Форель юкола",
    description: "Вяленая форель по-домашнему — насыщенный вкус и плотная текстура, идеальна к чаю.",
    price: 2000,
    unit: "кг",
    category: "Рыба",
    image: product01,
  },
  {
    id: "product-02",
    name: "Форель без головы и хвоста",
    description: "Копчёная форель без головы и хвоста — только нежное филе, готовое к столу.",
    price: 1800,
    unit: "кг",
    category: "Рыба",
    image: product02,
  },
  {
    id: "product-03",
    name: "Форель с головой и хвостом",
    description: "Целая копчёная форель с золотистой корочкой — ароматная и сочная до последнего кусочка.",
    price: 1700,
    unit: "кг",
    category: "Рыба",
    image: product03,
  },
  {
    id: "product-04",
    name: "Тунец",
    description: "Деликатесный копчёный тунец — плотное мясо с благородным морским вкусом.",
    price: 2100,
    unit: "кг",
    category: "Рыба",
    image: product04,
  },
  {
    id: "product-05",
    name: "Осётр",
    description: "Царская рыба горячего копчения — нежнейший осётр для особого случая.",
    price: 3000,
    unit: "кг",
    category: "Рыба",
    image: product05,
  },
  {
    id: "product-06",
    name: "Копчёные куриные ножки",
    description: "Сочные куриные ножки домашнего копчения с аппетитной золотистой кожицей.",
    price: 850,
    unit: "кг",
    category: "Копчёное мясо",
    image: product06,
  },
  {
    id: "product-07",
    name: "Копчёный курдюк",
    description: "Нежный курдюк холодного копчения — тает во рту, с тонким ароматом дымка.",
    price: 1000,
    unit: "кг",
    category: "Копчёное мясо",
    image: product07,
  },
  {
    id: "product-08",
    name: "Колбаса варёная",
    description: "Классическая варёная колбаса — нежная и ароматная, как в детстве.",
    price: 190,
    unit: "шт",
    category: "Колбасы и сосиски",
    image: product08,
  },
  {
    id: "product-09",
    name: "Колбаса куриная",
    description: "Лёгкая куриная колбаса из отборного мяса — нежный вкус без лишнего жира.",
    price: 650,
    unit: "кг",
    category: "Колбасы и сосиски",
    image: product09,
  },
  {
    id: "product-10",
    name: "Копчёная колбаса говяжья",
    description: "Копчёная говяжья колбаса с насыщенным мясным вкусом и ароматом дыма.",
    price: 500,
    unit: "кг",
    category: "Колбасы и сосиски",
    image: product10,
  },
  {
    id: "product-11",
    name: "Копчёная курица",
    description: "Золотистая копчёная курица целиком — сочное мясо с тонким дымным ароматом.",
    price: 850,
    unit: "кг",
    category: "Копчёное мясо",
    image: product11,
  },
  {
    id: "product-12",
    name: "Алихан Сервелат (полукопчёная)",
    description: "Фирменный сервелат «Алихан» — плотная полукопчёная колбаса с богатым вкусом.",
    price: 160,
    unit: "шт",
    category: "Колбасы и сосиски",
    image: product12,
  },
  {
    id: "product-13",
    name: "Сосиски варёные",
    description: "Нежные варёные сосиски — быстрый и вкусный перекус для всей семьи.",
    price: 900,
    unit: "кг",
    category: "Колбасы и сосиски",
    image: product13,
  },
  {
    id: "product-14",
    name: "Алия Семейные (куриные сосиски)",
    description: "Куриные сосиски «Алия Семейные» — нежные и сочные, любимцы детей.",
    price: 150,
    unit: "шт",
    category: "Колбасы и сосиски",
    image: product14,
  },
  {
    id: "product-15",
    name: "Алия Княжеская (полукопчёная)",
    description: "Полукопчёная колбаса «Алия Княжеская» — щедрый вкус для щедрого стола.",
    price: 230,
    unit: "шт",
    category: "Колбасы и сосиски",
    image: product15,
  },
  {
    id: "product-16",
    name: "Алия (полукопчёная)",
    description: "Классическая полукопчёная колбаса «Алия» — проверенное качество каждый день.",
    price: 180,
    unit: "шт",
    category: "Колбасы и сосиски",
    image: product16,
  },
  {
    id: "product-17",
    name: "Алия Мусульманская",
    description: "Халяльная колбаса «Алия Мусульманская» — только отборное мясо и честный состав.",
    price: 180,
    unit: "шт",
    category: "Колбасы и сосиски",
    image: product17,
  },
  {
    id: "product-27",
    name: "Копчёная колбаса",
    description: "Ароматная копчёная колбаса — насыщенный вкус с настоящим дымком.",
    price: 650,
    unit: "кг",
    category: "Колбасы и сосиски",
    image: product27,
  },
  {
    id: "product-18",
    name: "Чечил",
    description: "Копчёный сыр-косичка чечил — солоноватый, тягучий, с лёгким ароматом дымка.",
    price: 800,
    unit: "кг",
    category: "Молочные продукты",
    image: product18,
  },
  {
    id: "product-19",
    name: "Карын",
    description: "Традиционный деликатес карын — натуральный вкус по старинному рецепту.",
    price: 300,
    unit: "кг",
    category: "Копчёное мясо",
    image: product19,
  },
  {
    id: "product-20",
    name: "Сарымай",
    description: "Натуральное топлёное масло сарымай — золотистое и ароматное, по-домашнему.",
    price: 800,
    unit: "литр",
    category: "Молочные продукты",
    image: product20,
  },
  {
    id: "product-21",
    name: "Яблочный уксус",
    description: "Натуральный яблочный уксус — живая кислинка для салатов и маринадов.",
    price: 550,
    unit: "0.5 л",
    category: "Уксусы",
    image: product21,
  },
  {
    id: "product-22",
    name: "Виноградный уксус",
    description: "Благородный виноградный уксус — насыщенный аромат для изысканных блюд.",
    price: 1800,
    unit: "0.5 л",
    category: "Уксусы",
    image: product22,
  },
  {
    id: "product-23",
    name: "Дунганский уксус",
    description: "Ароматный дунганский уксус — незаменим для лагмана и азиатских блюд.",
    price: 250,
    unit: "литр",
    category: "Уксусы",
    image: product23,
  },
  {
    id: "product-24",
    name: "Рамен пшеничный",
    description: "Пшеничная лапша для рамена — упругая и нежная, впитывает вкус бульона.",
    price: 160,
    unit: "шт",
    category: "Рамен и лапша",
    image: product24,
  },
  {
    id: "product-25",
    name: "Рамен рисовый",
    description: "Рисовая лапша для рамена — лёгкая и полупрозрачная, без глютена.",
    price: 180,
    unit: "шт",
    category: "Рамен и лапша",
    image: product25,
  },
  {
    id: "product-26",
    name: "Рамен крахмальный",
    description: "Крахмальная лапша для рамена — особо упругая, с фирменной текстурой.",
    price: 200,
    unit: "шт",
    category: "Рамен и лапша",
    image: product26,
  },
];
