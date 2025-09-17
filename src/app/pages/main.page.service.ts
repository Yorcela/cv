import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MarkdownPipe } from '../pipes/markdown.pipe';
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
  private router = inject(Router);
  private markdownPipe = new MarkdownPipe();

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
   * Formate un texte d'accomplissement avec Markdown
   */
  formatAchievement(achievement: string): string {
    return this.markdownPipe.transform(achievement);
  }

  /**
   * Navigation vers les expériences détaillées
   */
  navigateToDetailedExperiences(): void {
    this.router.navigate(['/experiences-detaillees']);
  }

  /**
   * Navigation vers les recommandations
   */
  navigateToRecommendations(): void {
    this.router.navigate(['/recommandations']);
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

  /**
   * Récupère les accomplissements par catégorie
   */
  getAccomplishmentsByCategory(
    data: CVData | null, 
    category: string, 
    expanded: boolean
  ): any[] {
    if (!data?.accomplishments) return [];

    const categoryMap: { [key: string]: string[] } = {
      'transformation': ['transformation', 'change', 'agile', 'lean', 'process'],
      'leadership': ['leadership', 'team', 'management', 'coaching', 'mentor'],
      'innovation': ['innovation', 'product', 'development', 'creation', 'launch'],
      'performance': ['performance', 'improvement', 'optimization', 'efficiency', 'results']
    };

    const keywords = categoryMap[category] || [];

    const filtered = data.accomplishments.filter(acc =>
      keywords.some(keyword =>
        acc.title.toLowerCase().includes(keyword) ||
        acc.description.toLowerCase().includes(keyword)
      )
    );

    return expanded ? filtered : filtered.slice(0, 3);
  }



  /**
   * Récupère les catégories de compétences formatées
   */
  getSkillCategories(data: CVData | null): SkillCategory[] {
    if (!data?.skills) return [];

    const categories: SkillCategory[] = [];
    const iconMap: { [key: string]: { title: string; icon: string } } = {
      'Agilité': { title: 'Agilité', icon: 'fad fa-sync-alt' },
      'Coaching Agile': { title: 'Coaching Agile', icon: 'fad fa-chalkboard-teacher' },
      'Leadership/Management': { title: 'Leadership/Management', icon: 'fad fa-users' },
      'Delivery': { title: 'Delivery', icon: 'fad fa-shipping-fadt' },
      'Communication': { title: 'Communication', icon: 'fad fa-comments' },
      'Tech': { title: 'Tech', icon: 'fad fa-code' },
      'Langues': { title: 'Langues', icon: 'fad fa-globe' }
    };

    Object.keys(data.skills).forEach(key => {
      const skills = (data.skills as any)[key];
      if (Array.isArray(skills) && skills.length > 0) {
        const config = iconMap[key] || { title: key, icon: 'fad fa-star' };
        categories.push({
          title: config.title,
          icon: config.icon,
          skills
        });
      }
    });

    return categories;
  }
}