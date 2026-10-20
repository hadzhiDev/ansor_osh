import { Product, Category } from "@/lib/types";

// Базовый URL API задаётся в .env (см. .env.example).
// Пример: API_URL=https://ansor-osh.prolabagency.com/api
const API_BASE = (
  process.env.API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  ""
).replace(/\/+$/, "");

// Форма ответа DRF (ProductSerializer)
type ApiProduct = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  price: string; // DecimalField сериализуется как строка
  image: string | null; // абсолютный URL или null
  category_id: number | null;
  category_name: string | null;
  created_at: string;
  price_per?: string | null; // код из UNIT_CHOICES: "unit" | "kg" | "l" | "0.5 l"
};

// Подписи единиц — зеркало UNIT_CHOICES в Django-модели.
const UNIT_LABELS: Record<string, string> = {
  unit: "шт",
  kg: "кг",
  l: "л",
  "0.5 l": "0.5 л",
};

type ApiCategory = { id: number; name: string; slug: string };

// Ответ может быть массивом или пагинированным {count,next,previous,results}
type Paginated<T> = { results?: T[]; next?: string | null };

function mapProduct(p: ApiProduct): Product {
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    description: p.description ?? "",
    price: Number(p.price) || 0,
    unit: p.price_per ? UNIT_LABELS[p.price_per] ?? p.price_per : undefined,
    image: p.image ?? null,
    categoryId: p.category_id ?? null,
    categoryName: p.category_name ?? null,
  };
}

// Собирает все страницы (следует по `next`, если включена пагинация DRF).
async function fetchAll<T>(startUrl: string): Promise<T[]> {
  const out: T[] = [];
  let url: string | null = startUrl;
  let guard = 0;
  while (url && guard < 50) {
    const res: Response = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`API ${res.status} ${res.statusText} — ${url}`);
    const data: T[] | Paginated<T> = await res.json();
    if (Array.isArray(data)) {
      out.push(...data);
      url = null;
    } else {
      out.push(...(data.results ?? []));
      url = data.next ?? null;
    }
    guard += 1;
  }
  return out;
}

export async function getProducts(): Promise<Product[]> {
  if (!API_BASE) return [];
  try {
    const items = await fetchAll<ApiProduct>(`${API_BASE}/products/`);
    return items.map(mapProduct);
  } catch (err) {
    console.error("[api] getProducts failed:", err);
    return [];
  }
}

export async function getCategories(): Promise<Category[]> {
  if (!API_BASE) return [];
  try {
    return await fetchAll<ApiCategory>(`${API_BASE}/categories/`);
  } catch (err) {
    console.error("[api] getCategories failed:", err);
    return [];
  }
}

export const isApiConfigured = () => API_BASE.length > 0;
