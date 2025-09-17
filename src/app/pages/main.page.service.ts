import { Injectable } from '@angular/core';
import { CVVariant, VariantType } from '../types/common.types';

export interface SectionStates {
  about: boolean;
  experiences: boolean;
  accomplishments: boolean;
  recommendations: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class MainPageService {

  /**
   * Initialise les états des sections selon la variante
   */
  initializeSectionStates(variant: VariantType): SectionStates {
    return {
      about: true,
      experiences: true,
      accomplishments: true,
      recommendations: variant === CVVariant.FULL
    };
  }

  /**
   * Bascule l'état d'une section
   */
  toggleSection(
    currentStates: SectionStates,
    section: keyof SectionStates
  ): SectionStates {
    return {
      ...currentStates,
      [section]: !currentStates[section]
    };
  }


}