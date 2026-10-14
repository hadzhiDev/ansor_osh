// Frontend product/category shape (mapped from the Django REST API).
export type Product = {
  id: number;
  slug: string;
  name: string;
  description: string;
  price: number;
  unit?: string; // бэкенд пока не отдаёт — опционально
  image: string | null;
  categoryId: number | null;
  categoryName: string | null;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
};
