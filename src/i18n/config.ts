export const DEFAULT_LOCALE = "en" as const;

export const SUPPORTED_LOCALES = ["en", "th"] as const;

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export const ACTIVE_LOCALE: SupportedLocale = "en";
