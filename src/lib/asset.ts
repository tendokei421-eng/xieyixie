/** Public-file URL that respects Vite `base` (GitHub Pages lives under `/xieyixie/`). */
export function publicUrl(path: string) {
  const base = import.meta.env.BASE_URL || "/";
  return `${base}${String(path).replace(/^\//, "")}`;
}
