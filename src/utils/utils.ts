export function getBaseUrl() {
  if (typeof window !== "undefined") return window.location.origin;
  if (process.env.NODE_ENV === "production") return process.env.PROD_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}