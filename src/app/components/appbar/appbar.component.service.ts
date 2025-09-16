import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CVVariant, CVLanguage, VariantType, LanguageType } from '../../types/common.types';

const PDF_PATHS = {
  long_fr: 'assets/pdfs/CV_AlecRoy_AgileLeader_DirectorsCut_FR.pdf',
  long_en: 'assets/pdfs/CV_AlecRoy_AgileLeader_DirectorsCut_EN.pdf',
  short_bilingual: 'assets/pdfs/CV_AlecRoy_AgileLeader_short.pdf'
} as const;

@Injectable({
  providedIn: 'root'
})
export class AppbarComponentService {
  private readonly document = inject(DOCUMENT);

  /**
   * Détermine le chemin du PDF basé sur la langue et la variante
   */
  getCurrentPdfPath(lang: LanguageType, variant: VariantType): string {
    return variant === CVVariant.SHORT
      ? PDF_PATHS.short_bilingual
      : lang === CVLanguage.EN
        ? PDF_PATHS.long_en
        : PDF_PATHS.long_fr;
  }

  /**
   * Obtient le chemin d'un PDF spécifique
   */
  getSpecificPdfPath(type: keyof typeof PDF_PATHS): string {
    return PDF_PATHS[type];
  }

  /**
   * Télécharge un fichier de manière SSR-safe
   */
  downloadFile(path: string): void {
    const a = this.document.createElement('a');
    a.href = path;
    a.download = path.split('/').pop() || 'alec-roy-cv.pdf';
    this.document.body.appendChild(a);
    a.click();
    this.document.body.removeChild(a);
  }

  /**
   * Télécharge le CV basé sur la langue et variante actuelles
   */
  downloadCurrent(lang: LanguageType, variant: VariantType): void {
    const path = this.getCurrentPdfPath(lang, variant);
    this.downloadFile(path);
  }

  /**
   * Télécharge un PDF spécifique
   */
  downloadSpecific(type: keyof typeof PDF_PATHS): void {
    const path = this.getSpecificPdfPath(type);
    this.downloadFile(path);
  }
}