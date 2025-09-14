import { Component, Input, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <section class="main-section">
      <h2 class="main-section-title clickable-title" (click)="toggleAboutSection()">
        <i class="fad fa-user"></i>
        {{ 'i18n.ui.sections.about_me' | translate }}
        <i class="fad" [class.fa-chevron-down]="aboutSectionExpanded" [class.fa-chevron-right]="!aboutSectionExpanded"></i>
      </h2>
      <div *ngIf="aboutSectionExpanded">
        <div class="section-content">
          <div [innerHTML]="getFormattedAbout()"></div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent {
  @Input() variant: 'full' | 'short' = 'full';
  about: any = {};
  aboutSectionExpanded = true;

  constructor(private translate: TranslateService) {
    this.translate.get('cv').subscribe((data: any) => {
      // Handle both French structure (cv.about-me) and English structure (aboutShort/aboutLong)
      if (data['about-me']) {
        this.about = data['about-me'];
      } else {
        // English structure: aboutShort and aboutLong at root level
        this.about = {
          short: data.aboutShort?.description || '',
          long: data.aboutLong?.description || ''
        };
      }
    });
  }


  getFormattedAbout(): string {
    if (!this.about) return '';
    const aboutText = this.variant === 'full' ? this.about.long : this.about.short;
    return aboutText || '';
  }

  toggleAboutSection(): void {
    this.aboutSectionExpanded = !this.aboutSectionExpanded;
  }
}