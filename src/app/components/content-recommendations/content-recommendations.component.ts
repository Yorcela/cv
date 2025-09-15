import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MarkdownPipe } from '../../pipes/markdown.pipe';

interface Recommendation {
  name: string;
  role: string; 
  company: string;
  picture?: string;
  message: string;
}

@Component({
  selector: 'app-content-recommendations',
  standalone: true,
  imports: [CommonModule, TranslateModule, MarkdownPipe],
  template: `
    <section class="main-section">
      <h2 class="main-section-title clickable-title" (click)="onToggleSection()">
        <i class="fad fa-quote-left"></i>
        {{ 'i18n.ui.sections.recommendations' | translate }}
        <i class="fad" [class.fa-chevron-down]="isExpanded" [class.fa-chevron-right]="!isExpanded"></i>
      </h2>
      <div *ngIf="isExpanded" class="recommendations-grid">
        <div class="recommendation-card" *ngFor="let rec of getRecommendations()">
          <div class="author-header">
            <img *ngIf="rec.picture" [src]="rec.picture" [alt]="rec.name" class="author-avatar">
            <div class="author-info">
              <h4 class="author-name">{{ rec.name }}</h4>
              <p class="author-title">{{ rec.role }}</p>
              <p class="author-company" *ngIf="rec.company">{{ rec.company }}</p>
            </div>
          </div>
          <div class="recommendation-text" [innerHTML]="formatTestimonial(rec.message)"></div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./content-recommendations.component.scss']
})
export class ContentRecommendationsComponent {
  @Input() variant: 'full' | 'short' = 'full';
  @Input() data: any = null;
  @Input() isExpanded: boolean = true;
  @Output() toggleSection = new EventEmitter<void>();
  recommendations: Recommendation[] = [];

  constructor(private translate: TranslateService) {
    this.translate.get('cv.recommandations').subscribe((data: Recommendation[]) => {
      this.recommendations = data || [];
    });
  }

  formatTestimonial(testimonial: string): string {
    // Use markdown pipe for basic formatting
    const markdownPipe = new MarkdownPipe();
    let formattedText = markdownPipe.transform(testimonial);
    
    // Add emphasis to certain phrases
    const emphasisPhrases = [
      'excellent', 'exceptionnel', 'remarquable', 'outstanding', 'exceptional',
      'très bon', 'parfait', 'idéal', 'recommande vivement', 'highly recommend',
      'sans hésitation', 'without hesitation', 'atout majeur', 'major asset'
    ];

    emphasisPhrases.forEach(phrase => {
      const regex = new RegExp(`(${phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
      formattedText = formattedText.replace(regex, '<em>$1</em>');
    });

    return formattedText;
  }

  onToggleSection(): void {
    this.toggleSection.emit();
  }

  getRecommendations(): Recommendation[] {
    return this.recommendations;
  }
}