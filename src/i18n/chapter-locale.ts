export type Locale = "en" | "vi";

export const LOCALES: Locale[] = ["en", "vi"];

export const LOCALE_STORAGE_KEY = "handbook-locale";

export type ChapterLocaleOverlay = {
  title: string;
  scope: string;
  assumptions: string;
  engineeringNote: string;
  equations: Record<string, string>;
  nomenclature: Record<string, string>;
  schematicCaption: string;
  examples: Record<
    string,
    {
      prompt: string;
      physicalModel: string;
      result: string;
      interpretation: string;
    }
  >;
};
