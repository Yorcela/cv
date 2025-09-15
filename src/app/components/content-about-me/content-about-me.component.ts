import { Component, Input, Output, EventEmitter, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-content-about-me',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <section class="main-section">
      <h2 class="main-section-title clickable-title" (click)="onToggleSection()">
        <i class="fad fa-user"></i>
        {{ 'i18n.ui.sections.about_me' | translate }}
        <i class="fad" [class.fa-chevron-down]="isExpanded" [class.fa-chevron-right]="!isExpanded"></i>
      </h2>
      <div *ngIf="isExpanded">
        <div class="section-content">
          <div [innerHTML]="getFormattedAbout()"></div>
        </div>
      </div>
    </section>
  `
})
export class ContentAboutMeComponent {
  @Input() variant: 'full' | 'short' = 'full';
  @Input() isExpanded: boolean = true;
  @Output() toggleSection = new EventEmitter<void>();
  about: any = {};

  constructor(private translate: TranslateService) {
    this.translate.get('cv').subscribe((data: any) => {
      this.about = data['about-me'];
    });
  }


  getFormattedAbout(): string {
    if (!this.about) return '';
    const aboutText = this.variant === 'full' ? this.about.long : this.about.short;
    return aboutText || '';
  }

  onToggleSection(): void {
    this.toggleSection.emit();
  }
}