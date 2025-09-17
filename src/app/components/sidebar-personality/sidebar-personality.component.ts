import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PdfViewerComponent } from '../pdf-viewer/pdf-viewer.component';
import { SidebarPersonalityService, PersonalityItem } from './sidebar-personality.service';

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

  private translate = inject(TranslateService);
  private personalityService = inject(SidebarPersonalityService);

  constructor() {
    this.personalityService.getPersonalityData().subscribe((data: any) => {
      this.personality = data || {};
    });
    
    this.currentLang = this.translate.currentLang || 'fr';
    this.translate.onLangChange.subscribe((event) => {
      this.currentLang = event.lang;
    });
    
    this.checkIfMobile();
    window.addEventListener('resize', () => this.checkIfMobile());
  }

  checkIfMobile() {
    this.isMobile = this.personalityService.checkIfMobile();
  }

  getPersonalityData() {
    return this.personality;
  }

  getPersonalityItems(): PersonalityItem[] {
    return this.personalityService.getPersonalityItems(this.personality, this.isMobile);
  }

  handlePersonalityClick(item: PersonalityItem) {
    const pdfViewerData = this.personalityService.handlePersonalityClick(item, this.isMobile);
    
    if (pdfViewerData) {
      this.currentPdfSrc = pdfViewerData.src;
      this.currentPdfTitle = pdfViewerData.title;
      this.showPdfViewer = true;
    }
  }

  closePdfViewer() {
    this.showPdfViewer = false;
    const resetData = this.personalityService.resetPdfViewerData();
    this.currentPdfSrc = resetData.src;
    this.currentPdfTitle = resetData.title;
  }
}