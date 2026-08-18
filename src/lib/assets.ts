const ASSET_ORIGIN = "https://project--dbec8924-ca7b-41f6-b87a-9cd9693ce1a1.lovable.app";

export function deployedAssetUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${ASSET_ORIGIN}${path.startsWith("/") ? path : `/${path}`}`;
}