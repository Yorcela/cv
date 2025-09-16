import { Injectable, inject } from '@angular/core';
import { MarkdownPipe } from '../../pipes/markdown.pipe';
import { CVVariant, VariantType } from '../../types/common.types';
import { AccomplishmentDetailed } from './content-accomplishments.component.interface';

@Injectable({
  providedIn: 'root'
})
export class ContentAccomplishmentsService {
  private readonly markdownPipe = new MarkdownPipe();

  /**
   * Formate un détail avec le pipe markdown
   */
  formatDetail(detail: string): string {
    return this.markdownPipe.transform(detail);
  }

  /**
   * Formate un détail selon la variante (court/complet)
   */
  formatDetailForVariant(detail: string, variant: VariantType): string {
    let formattedDetail = detail;

    if (variant === CVVariant.SHORT) {
      const resultIndexFr = detail.indexOf('<br/><u>Résultat:</u>');
      const resultIndexEn = detail.indexOf('<br/><u>Result:</u>');
      const resultIndex = resultIndexFr !== -1 ? resultIndexFr : resultIndexEn;
      if (resultIndex !== -1) {
        formattedDetail = detail.substring(0, resultIndex);
      }
    }

    return this.markdownPipe.transform(formattedDetail);
  }

  /**
   * Extrait tous les détails de tous les accomplissements
   */
  extractAllDetails(accomplishments: AccomplishmentDetailed[]): string[] {
    const allDetails: string[] = [];
    accomplishments.forEach(accomplishment => {
      accomplishment.details.forEach(detail => {
        allDetails.push(detail);
      });
    });
    return allDetails;
  }

  /**
   * Filtre et formate les détails selon la variante
   */
  getFormattedDetailsForVariant(accomplishments: AccomplishmentDetailed[], variant: VariantType): string[] {
    const allDetails = this.extractAllDetails(accomplishments);
    return allDetails.map(detail => this.formatDetailForVariant(detail, variant));
  }

  /**
   * Vérifie si un accomplissement a des détails visibles pour la variante donnée
   */
  hasVisibleDetails(accomplishment: AccomplishmentDetailed, variant: VariantType): boolean {
    return accomplishment.details.some(detail => {
      if (variant === CVVariant.SHORT) {
        const resultIndexFr = detail.indexOf('<br/><u>Résultat:</u>');
        const resultIndexEn = detail.indexOf('<br/><u>Result:</u>');
        return resultIndexFr === -1 && resultIndexEn === -1;
      }
      return true;
    });
  }
}