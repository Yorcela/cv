import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PdfViewerComponent } from '../pdf-viewer/pdf-viewer.component';
import { PersonalInfo } from './sidebar-contact-info.component.interface';

@Component({
  selector: 'app-sidebar-contact-info',
  standalone: true,
  imports: [CommonModule, TranslateModule, PdfViewerComponent],
  templateUrl: './sidebar-contact-info.component.html',
  styleUrls: ['./sidebar-contact-info.component.scss']
})
export class SidebarContactInfoComponent {
  personalInfo: PersonalInfo = {} as PersonalInfo;
  personality: any = {};
  ui: any = {};
  currentLang: string = 'fr';
  showPdfViewer: boolean = false;
  currentPdfSrc: string = '';
  currentPdfTitle: string = '';

  constructor(private translate: TranslateService) {
    this.translate.get('cv.personalInfo').subscribe((data: any) => {
      this.personalInfo = data || {};
    });
    
    this.translate.get('cv.personnality').subscribe((data: any) => {
      this.personality = data || {};
    });
    

    this.currentLang = this.translate.currentLang || 'fr';
    this.translate.onLangChange.subscribe((event) => {
      this.currentLang = event.lang;
    });
  }


  hasAssessFirstPdf(): boolean {
    return this.currentLang === 'fr' && this.personality?.assessfirst_pdf;
  }

  hasAssessFirstUrl(): boolean {
    return this.currentLang === 'en' && this.personality?.assessfirst_url;
  }

  getAssessFirstUrl(): string {
    return this.personality?.assessfirst_url || '';
  }


  shouldShowInsightDiscovery(): boolean {
    return this.currentLang === 'fr' || (this.currentLang === 'en' && this.personality?.insightDiscovery_url);
  }

  hasInsightDiscoveryPdf(): boolean {
    return this.currentLang === 'fr' && this.personality?.insightDiscovery_pdf;
  }

  hasInsightDiscoveryUrl(): boolean {
    return this.currentLang === 'en' && this.personality?.insightDiscovery_url;
  }

  getInsightDiscoveryUrl(): string {
    return this.personality?.insightDiscovery_url || '';
  }


  shouldShowMbti(): boolean {
    return this.personality?.mbti_url;
  }

  getMbtiUrl(): string {
    return this.personality?.mbti_url || '';
  }

  openPdfViewer(type: 'assessfirst' | 'insightDiscovery') {
    if (type === 'assessfirst') {
      this.currentPdfSrc = this.personality?.assessfirst_pdf || '';
      this.translate.get('i18n.ui.assessfirst').subscribe((title: string) => {
        this.currentPdfTitle = title;
      });
    } else if (type === 'insightDiscovery') {
      this.currentPdfSrc = this.personality?.insightDiscovery_pdf || '';
      this.translate.get('i18n.ui.insightDiscovery').subscribe((title: string) => {
        this.currentPdfTitle = title;
      });
    }
    this.showPdfViewer = true;
  }

  closePdfViewer() {
    this.showPdfViewer = false;
    this.currentPdfSrc = '';
    this.currentPdfTitle = '';
  }
}