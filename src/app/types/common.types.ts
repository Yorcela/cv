export enum CVVariant {
  FULL = 'full',
  SHORT = 'short'
}
export enum CVLanguage {
  FR = 'fr',
  EN = 'en'
}
export type VariantType = CVVariant.FULL | CVVariant.SHORT;
export type LanguageType = CVLanguage.FR | CVLanguage.EN;