import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";
import { getProducts, getCategories } from "@/lib/api";

// Данные тянем с бэкенда при каждом запросе (всегда свежий каталог).
export const dynamic = "force-dynamic";

export default async function Home() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <>
      <Hero />
      <ProductGrid products={products} categories={categories} />
      <Footer />
    </>
  );
}
