/**
 * Types et enums communs utilisés dans l'application
 */

/**
 * Enum pour les variantes d'affichage du CV
 */
export enum CVVariant {
  FULL = 'full',
  SHORT = 'short'
}

/**
 * Enum pour les langues supportées
 */
export enum CVLanguage {
  FR = 'fr',
  EN = 'en'
}

/**
 * Type union pour les variantes (pour compatibilité avec le code existant)
 */
export type VariantType = CVVariant.FULL | CVVariant.SHORT;

/**
 * Type union pour les langues (pour compatibilité avec le code existant)
 */
export type LanguageType = CVLanguage.FR | CVLanguage.EN;