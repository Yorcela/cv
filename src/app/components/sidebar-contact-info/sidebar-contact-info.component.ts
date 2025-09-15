import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PdfViewerComponent } from '../pdf-viewer/pdf-viewer.component';

@Component({
  selector: 'app-sidebar-contact-info',
  standalone: true,
  imports: [CommonModule, TranslateModule, PdfViewerComponent],
  template: `
    <div class="sidebar-block sidebar-contact">
      <div class="contact-item">
        <span class="icon-chip" [attr.data-tooltip]="'i18n.ui.phone' | translate">
          <i class="fad fa-phone"></i>
        </span>
        <span>{{ personalInfo?.phone }}</span>
      </div>
      <div class="contact-item">
        <span class="icon-chip" [attr.data-tooltip]="'i18n.ui.email' | translate">
          <i class="fad fa-envelope"></i>
        </span>
        <a [href]="'mailto:' + personalInfo?.email">{{personalInfo?.email }}</a>
      </div>
      <div class="contact-item">
        <span class="icon-chip" [attr.data-tooltip]="'i18n.ui.location' | translate">
          <i class="fad fa-map-marker-alt"></i>
        </span>
        <span>{{ personalInfo?.location }}</span>
      </div>
      <div class="contact-item">
        <span class="icon-chip" data-tooltip="LinkedIn">
          <i class="fab fa-linkedin"></i>
        </span>
        <a [href]="personalInfo?.linkedin" target="_blank">{{ 'i18n.ui.linkedin' | translate }}</a>
      </div>
      <div class="contact-item">
        <span class="icon-chip" data-tooltip="YouTube">
          <i class="fab fa-youtube"></i>
        </span>
        <a [href]="personalInfo?.youtube" target="_blank">{{ 'i18n.ui.youtube' | translate }}</a>
      </div>
    </div>
    
    <app-pdf-viewer
      [isVisible]="showPdfViewer"
      [pdfSrc]="currentPdfSrc"
      [title]="currentPdfTitle"
      (closeViewer)="closePdfViewer()">
    </app-pdf-viewer>
  `,
  styleUrls: ['./sidebar-contact-info.component.scss']
})
export class SidebarContactInfoComponent {
  personalInfo: any = {};
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
    
    // Get current language
    this.currentLang = this.translate.currentLang || 'fr';
    this.translate.onLangChange.subscribe((event) => {
      this.currentLang = event.lang;
    });
  }

  // AssessFirst methods
  hasAssessFirstPdf(): boolean {
    return this.currentLang === 'fr' && this.personality?.assessfirst_pdf;
  }

  hasAssessFirstUrl(): boolean {
    return this.currentLang === 'en' && this.personality?.assessfirst_url;
  }

  getAssessFirstUrl(): string {
    return this.personality?.assessfirst_url || '';
  }

  // Insight Discovery methods
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

  // MBTI methods
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