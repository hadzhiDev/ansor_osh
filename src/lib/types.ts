// Frontend product/category shape (mapped from the Django REST API).
export type Product = {
  id: number;
  slug: string;
  name: string;
  description: string;
  price: number;
  unit?: string; // подпись из price_per бэкенда ("кг", "шт", "л", "0.5 л")
  image: string | null;
  categoryId: number | null;
  categoryName: string | null;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
};
