import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PdfViewerComponent } from '../pdf-viewer/pdf-viewer.component';

@Component({
  selector: 'app-sidebar-personality',
  standalone: true,
  imports: [CommonModule, TranslateModule, PdfViewerComponent],
  templateUrl: './sidebar-personality.component.html',
  styleUrls: ['./sidebar-personality.component.scss']
})
export class SidebarPersonalityComponent {
  personality: any = {};
  currentLang: string = 'fr';
  showPdfViewer: boolean = false;
  currentPdfSrc: string = '';
  currentPdfTitle: string = '';
  isMobile: boolean = false;

  constructor(private translate: TranslateService) {
    this.translate.get('cv.personnality').subscribe((data: any) => {
      this.personality = data || {};
    });
    
    // Get current language
    this.currentLang = this.translate.currentLang || 'fr';
    this.translate.onLangChange.subscribe((event) => {
      this.currentLang = event.lang;
    });
    
    // Detect mobile
    this.checkIfMobile();
    window.addEventListener('resize', () => this.checkIfMobile());
  }

  checkIfMobile() {
    this.isMobile = window.innerWidth <= 430;
  }

  getPersonalityData() {
    return this.personality;
  }

  getPersonalityItems(): any[] {
    const personalityData = this.getPersonalityData();
    const items: any[] = [];

    Object.keys(personalityData).forEach(key => {
      const item = personalityData[key];
      if (item && (item.pdf || item.url)) {
        // Sur mobile : privilégier les URLs, masquer les PDF
        // Sur desktop : privilégier les PDF
        const hasValidAction = this.isMobile ? item.url : (item.pdf || item.url);
        
        if (hasValidAction) {
          items.push({
            key,
            label: item.label,
            icon: item.icon,
            tooltip: item.tooltip,
            pdf: this.isMobile ? null : item.pdf, // Masquer PDF sur mobile
            url: item.url
          });
        }
      }
    });

    return items;
  }

  handlePersonalityClick(item: any) {
    // Sur mobile : toujours privilégier les URLs
    if (this.isMobile && item.url) {
      window.open(item.url, '_blank');
    }
    // Sur desktop : privilégier les PDF, puis les URLs
    else if (!this.isMobile && item.pdf) {
      this.currentPdfSrc = item.pdf;
      this.currentPdfTitle = item.label;
      this.showPdfViewer = true;
    } else if (item.url) {
      window.open(item.url, '_blank');
    }
  }

  closePdfViewer() {
    this.showPdfViewer = false;
    this.currentPdfSrc = '';
    this.currentPdfTitle = '';
  }
}