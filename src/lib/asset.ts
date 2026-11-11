/** Resolve public asset paths for GitHub Pages / subdirectory deploys. */
export function asset(path: string): string {
  const cleaned = path.replace(/^\//, "");
  return `${import.meta.env.BASE_URL}${cleaned}`;
}
