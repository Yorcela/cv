import { Component, Input } from '@angular/core';
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
  selector: 'app-recommendations',
  standalone: true,
  imports: [CommonModule, TranslateModule, MarkdownPipe],
  template: `
    <section class="main-section">
      <h2 class="main-section-title clickable-title" (click)="toggleRecommendationsSection()">
        <i class="fad fa-quote-left"></i>
        {{ 'i18n.ui.sections.recommendations' | translate }}
        <i class="fad" [class.fa-chevron-down]="recommendationsSectionExpanded" [class.fa-chevron-right]="!recommendationsSectionExpanded"></i>
      </h2>
      <div *ngIf="recommendationsSectionExpanded">
        <div class="recommendation-card" *ngFor="let rec of getRecommendations()">
          <p class="recommendation-text" [innerHTML]="formatTestimonial(rec.message)"></p>
          <div class="recommendation-author">
            <img *ngIf="rec.picture" [src]="rec.picture" [alt]="rec.name" class="author-avatar">
            <div class="author-info">
              <h4 class="author-name">{{ rec.name }}</h4>
              <p class="author-title">{{ rec.role }}<span *ngIf="rec.company"> {{ rec.company }}</span></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent {
  @Input() variant: 'full' | 'short' = 'full';
  recommendations: Recommendation[] = [];
  recommendationsSectionExpanded = true;

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

  toggleRecommendationsSection(): void {
    this.recommendationsSectionExpanded = !this.recommendationsSectionExpanded;
  }

  getRecommendations(): Recommendation[] {
    return this.recommendations;
  }
}