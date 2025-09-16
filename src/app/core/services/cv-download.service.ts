import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CVVariant, CVLanguage, VariantType, LanguageType } from '../../types/common.types';

@Injectable({ providedIn: 'root' })
export class CvDownloadService {
  private readonly PATHS = {
    long_fr: 'assets/pdfs/CV_AlecRoy_AgileLeader_DirectorsCut_FR.pdf',
    long_en: 'assets/pdfs/CV_AlecRoy_AgileLeader_DirectorsCut_EN.pdf',
    short_bilingual: 'assets/pdfs/CV_AlecRoy_AgileLeader_short.pdf'
  } as const;

  private readonly document = inject(DOCUMENT);

  downloadSpecific(type: keyof typeof this.PATHS): void {
    this.downloadFile(this.PATHS[type]);
  }

  downloadCurrent(lang: LanguageType, variant: VariantType): void {
    const path = variant === CVVariant.SHORT
      ? this.PATHS.short_bilingual
      : lang === CVLanguage.EN
        ? this.PATHS.long_en
        : this.PATHS.long_fr;
    
    this.downloadFile(path);
  }

  private downloadFile(path: string): void {
    // SSR-safe anchor creation via injected DOCUMENT
    const anchor = this.document.createElement('a');
    anchor.href = path;
    anchor.download = path.split('/').pop() || 'alec-roy-cv.pdf';
    this.document.body.appendChild(anchor);
    anchor.click();
    this.document.body.removeChild(anchor);
  }
}