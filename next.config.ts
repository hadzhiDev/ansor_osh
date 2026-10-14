import type { NextConfig } from "next";

// Разрешаем next/image грузить фото товаров с хоста бэкенда.
// Хост (протокол/домен/порт) берётся из переменных окружения:
//   API_URL / NEXT_PUBLIC_API_URL  — базовый URL API (и обычно медиа),
//   NEXT_PUBLIC_MEDIA_URL          — если медиа на другом домене/CDN.
type Pattern = { protocol: "http" | "https"; hostname: string; port: string };

function patternFrom(url?: string): Pattern | null {
  try {
    if (!url) return null;
    const u = new URL(url);
    return {
      protocol: u.protocol.replace(":", "") as "http" | "https",
      hostname: u.hostname,
      port: u.port || "",
    };
  } catch {
    return null;
  }
}

const candidates = [
  process.env.API_URL,
  process.env.NEXT_PUBLIC_API_URL,
  process.env.NEXT_PUBLIC_MEDIA_URL,
  "http://localhost:8000", // Django dev по умолчанию
  "http://127.0.0.1:8000",
];

const seen = new Set<string>();
const remotePatterns = candidates
  .map(patternFrom)
  .filter((p): p is Pattern => p !== null)
  .filter((p) => {
    const key = `${p.protocol}//${p.hostname}:${p.port}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

const nextConfig: NextConfig = {
  images: {
    remotePatterns,
    // В разработке разрешаем локальный бэкенд (localhost/127.0.0.1).
    // В проде остаётся защита от SSRF (бэкенд — публичный домен).
    dangerouslyAllowLocalIP: process.env.NODE_ENV !== "production",
  },
};

export default nextConfig;
