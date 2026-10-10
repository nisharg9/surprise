/**
 * Universal Asset URL Resolver for GitHub Pages & Localhost
 * 
 * Automatically prepends the base URL (e.g. /surprise/) when deployed on GitHub Pages.
 */

export function getAssetUrl(path) {
  if (!path) return '';
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('blob:') ||
    path.startsWith('data:')
  ) {
    return path;
  }

  // Strip leading slash
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const base = import.meta.env.BASE_URL || '/';
  
  return base.endsWith('/') ? `${base}${cleanPath}` : `${base}/${cleanPath}`;
}
