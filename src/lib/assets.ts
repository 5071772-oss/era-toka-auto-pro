const ASSET_ORIGIN = "https://era-toka-auto-pro.lovable.app";

export function deployedAssetUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${ASSET_ORIGIN}${path.startsWith("/") ? path : `/${path}`}`;
}