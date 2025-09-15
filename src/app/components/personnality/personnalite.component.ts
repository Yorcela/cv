import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PdfViewerComponent } from '../pdf-viewer/pdf-viewer.component';

@Component({
  selector: 'app-personnalite',
  standalone: true,
  imports: [CommonModule, TranslateModule, PdfViewerComponent],
  template: `
    <div class="sidebar-block sidebar-personnalite">
      <h3 class="sidebar-title">
        <i class="fad fa-theater-masks"></i> 
        {{ 'i18n.ui.sections.personnalite' | translate }}
      </h3>
      <div class="personality-chips-container">
        <div class="personality-category" *ngFor="let personalityItem of getPersonalityItems()">
          <div class="category-header">
            <span class="icon-chip" [attr.data-tooltip]="personalityItem.tooltip">
              <i class="fad {{ personalityItem.icon }}"></i>
            </span>
          </div>
          <div class="personality-action">
            <span class="personality-item" (click)="handlePersonalityClick(personalityItem)">
              {{ personalityItem.label }}
            </span>
          </div>
        </div>
      </div>
    </div>
    
    <app-pdf-viewer
      [isVisible]="showPdfViewer"
      [pdfSrc]="currentPdfSrc"
      [title]="currentPdfTitle"
      (closeViewer)="closePdfViewer()">
    </app-pdf-viewer>
  `,
  styleUrls: ['./personnalite.component.css']
})
export class PersonnaliteComponent {
  personality: any = {};
  currentLang: string = 'fr';
  showPdfViewer: boolean = false;
  currentPdfSrc: string = '';
  currentPdfTitle: string = '';

  constructor(private translate: TranslateService) {
    this.translate.get('cv.personnality').subscribe((data: any) => {
      this.personality = data || {};
    });
    
    // Get current language
    this.currentLang = this.translate.currentLang || 'fr';
    this.translate.onLangChange.subscribe((event) => {
      this.currentLang = event.lang;
    });
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
        items.push({
          key,
          label: item.label,
          icon: item.icon,
          tooltip: item.tooltip,
          pdf: item.pdf,
          url: item.url
        });
      }
    });

    return items;
  }

  handlePersonalityClick(item: any) {
    if (item.pdf) {
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