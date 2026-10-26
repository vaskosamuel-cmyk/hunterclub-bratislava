export const LANGUAGES = ['sk', 'en', 'de', 'ru'] as const;
export type Language = typeof LANGUAGES[number];
export function languagePath(pathname: string, language: Language, search = '', hash = '') {
  const parts = pathname.split('/');
  if (LANGUAGES.includes(parts[1] as Language)) parts[1] = language;
  else parts.splice(1, 0, language);
  return parts.join('/').replace(/\/$/, '') + search + hash;
}
