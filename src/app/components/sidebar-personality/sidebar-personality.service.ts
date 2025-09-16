import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

export interface PersonalityItem {
  key: string;
  label: string;
  icon: string;
  tooltip: string;
  pdf: string | null;
  url: string;
}

export interface PdfViewerData {
  src: string;
  title: string;
}

@Injectable({
  providedIn: 'root'
})
export class SidebarPersonalityService {
  private translateService = inject(TranslateService);

  /**
   * Récupère les données de personnalité depuis les traductions
   */
  getPersonalityData(): Observable<any> {
    return this.translateService.get('cv.personnality');
  }

  /**
   * Vérifie si l'appareil est mobile
   */
  checkIfMobile(): boolean {
    return window.innerWidth <= 430;
  }

  /**
   * Filtre et formate les items de personnalité selon le contexte (mobile/desktop)
   */
  getPersonalityItems(personalityData: any, isMobile: boolean): PersonalityItem[] {
    const items: PersonalityItem[] = [];

    Object.keys(personalityData).forEach(key => {
      const item = personalityData[key];
      if (item && (item.pdf || item.url)) {
        // Vérifie si l'item a une action valide selon le contexte
        const hasValidAction = isMobile ? item.url : (item.pdf || item.url);
        
        if (hasValidAction) {
          items.push({
            key,
            label: item.label,
            icon: item.icon,
            tooltip: item.tooltip,
            pdf: isMobile ? null : item.pdf,
            url: item.url
          });
        }
      }
    });

    return items;
  }

  /**
   * Gère la logique de clic sur un item de personnalité
   */
  handlePersonalityClick(item: PersonalityItem, isMobile: boolean): PdfViewerData | null {
    // Mobile : ouvre toujours l'URL
    if (isMobile && item.url) {
      window.open(item.url, '_blank');
      return null;
    }

    // Desktop : priorité au PDF, sinon URL
    if (!isMobile && item.pdf) {
      return {
        src: item.pdf,
        title: item.label
      };
    } else if (item.url) {
      window.open(item.url, '_blank');
      return null;
    }

    return null;
  }

  /**
   * Prépare les données pour le visualiseur PDF
   */
  preparePdfViewerData(src: string, title: string): PdfViewerData {
    return { src, title };
  }

  /**
   * Réinitialise les données du visualiseur PDF
   */
  resetPdfViewerData(): PdfViewerData {
    return { src: '', title: '' };
  }
}