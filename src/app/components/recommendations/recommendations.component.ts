import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MarkdownPipe } from '../../pipes/markdown.pipe';

interface Recommendation {
  name: string;
  position: string;
  company: string;
  photo?: string;
  text: string;
  relationship?: string;
  date?: string;
  linkedinUrl?: string;
}

interface CVData {
  recommendations: Recommendation[];
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
          <p class="recommendation-text">"{{ rec.text }}"</p>
          <div class="recommendation-author">
            <img *ngIf="rec.photo" [src]="rec.photo" [alt]="rec.name" class="author-avatar">
            <div class="author-info">
              <h4 class="author-name">{{ rec.name }}</h4>
              <p class="author-title">{{ rec.position }}<span *ngIf="rec.company"> chez {{ rec.company }}</span></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent implements OnChanges {
  @Input() lang: 'fr' | 'en' = 'fr';
  data: CVData | null = null;
  loading = true;
  error: string | null = null;
  recommendationsSectionExpanded = true;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnChanges(): void {
    this.loading = true;
    this.error = null;
    this.loadData();
  }

  private loadData(): void {
    const fileName = `${this.lang}.json`;
    this.http.get<CVData>(`assets/i18n/${fileName}`).subscribe({
      next: (data) => {
        this.data = data;
        this.loading = false;
        this.error = null;
      },
      error: (err) => {
        console.error('Error loading recommendations data:', err);
        this.error = 'Erreur lors du chargement des données des recommandations';
        this.data = null;
        this.loading = false;
      }
    });
  }

  formatTestimonial(testimonial: string, highlights?: string[]): string {
    // Use markdown pipe for basic formatting
    const markdownPipe = new MarkdownPipe();
    let formattedText = markdownPipe.transform(testimonial);
    
    // Apply highlights if provided
    if (highlights && highlights.length > 0) {
      highlights.forEach(highlight => {
        const regex = new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        formattedText = formattedText.replace(regex, '<strong>$1</strong>');
      });
    }

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
    if (!this.data?.recommendations) {
      return [];
    }
    
    return this.data.recommendations;
  }

  navigateHome(): void {
    this.router.navigate(['/']);
  }
}