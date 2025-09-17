import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CVVariant, VariantType, LanguageType } from '../types/common.types';
import { CVData } from './main.page.component.interface';
import { SkillCategory } from '../components/sidebar-skills/sidebar-skills.component.interface';
import { Experience } from '../components/content-experiences/content-experiences.component.interface';

export interface SectionStates {
  about: boolean;
  experiences: boolean;
  accomplishments: boolean;
  recommendations: boolean;
}

export interface DataLoadResult {
  data: CVData | null;
  error: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class MainPageService {
  private http = inject(HttpClient);

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





  /**
   * Charge les données CV depuis les fichiers i18n
   */
  loadData(lang: LanguageType): Observable<DataLoadResult> {
    const fileName = `${lang}.json`;
    const filePath = `assets/i18n/${fileName}`;
    
    return new Observable(observer => {
      this.http.get<any>(filePath).subscribe({
        next: (data) => {
          observer.next({
            data: data.cv,
            error: null
          });
          observer.complete();
        },
        error: (err) => {
          observer.next({
            data: null,
            error: err.message || 'Erreur lors du chargement des données'
          });
          observer.complete();
        }
      });
    });
  }

  /**
   * Récupère le texte "À propos" selon la variante
   */
  getAboutText(data: CVData | null, variant: VariantType): string {
    if (!data) return '';
    
    if (variant === CVVariant.SHORT) {
      return typeof data.aboutShort === 'string' 
        ? data.aboutShort 
        : data.aboutShort?.description || '';
    }
    return typeof data.aboutLong === 'string' 
      ? data.aboutLong 
      : data.aboutLong?.description || '';
  }

  /**
   * Récupère les expériences selon la variante
   */
  getExperiences(data: CVData | null, variant: VariantType): Experience[] {
    if (!data) return [];
    return variant === CVVariant.SHORT
      ? data.experiencesShort || []
      : data.experiencesLong || [];
  }

  /**
   * Récupère les recommandations avec limitation optionnelle
   */
  getRecommendations(data: CVData | null, expanded: boolean): any[] {
    if (!data?.recommendations) return [];
    return expanded ? data.recommendations : data.recommendations.slice(0, 3);
  }
}