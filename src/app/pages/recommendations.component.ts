import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MarkdownPipe } from '../pipes/markdown.pipe';

interface Recommendation {
  name: string;
  position: string;
  company: string;
  photo?: string;
  testimonial: string;
  highlights?: string[];
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
    <div class="recommendations-container">
      <!-- Loading State -->
      <div *ngIf="loading" class="loading-card">
        <i class="fas fa-spinner fa-spin"></i>
        <span>Chargement des recommandations...</span>
      </div>

      <!-- Error State -->
      <div *ngIf="error" class="error-state">
        <div class="error-card">
          <i class="fas fa-exclamation-triangle"></i>
          <h3>Erreur</h3>
          <p>{{ error }}</p>
        </div>
      </div>

      <!-- Content -->
      <div *ngIf="!loading && !error && data" class="recommendations-content">
        <div class="recommendations-content-inner">
        <!-- Header -->
        <header class="page-header">
          <div class="header-navigation">
            <button class="back-button" (click)="navigateHome()">
              <i class="fal fa-arrow-left"></i>
              Retour au CV
            </button>
          </div>
          <h1 class="page-title">{{ 'sections.recommendations' | translate }}</h1>
          <p class="page-subtitle">Témoignages de managers et collègues</p>
        </header>

        <!-- Recommendations Grid -->
        <div class="recommendations-grid">
          <div *ngFor="let rec of data.recommendations; let i = index" 
               class="recommendation-card" 
               [class.left-column]="i % 2 === 0"
               [class.right-column]="i % 2 === 1">
            
            <!-- Card Header -->
            <div class="card-header">
              <div class="author-info">
                <div class="author-photo">
                  <img *ngIf="rec.photo" [src]="rec.photo" [alt]="rec.name" class="photo">
                  <div *ngIf="!rec.photo" class="photo-placeholder">
                    <i class="fal fa-user"></i>
                  </div>
                </div>
                <div class="author-details">
                  <h3 class="author-name">{{ rec.name }}</h3>
                  <p class="author-position">{{ rec.position }}</p>
                  <p class="author-company">{{ '@' + rec.company }}</p>
                </div>
              </div>
              <div *ngIf="rec.linkedinUrl" class="linkedin-link">
                <a [href]="rec.linkedinUrl" target="_blank" rel="noopener noreferrer">
                  <i class="fab fa-linkedin"></i>
                </a>
              </div>
            </div>

            <!-- Card Content -->
            <div class="card-content">
              <div class="testimonial-text" [innerHTML]="formatTestimonial(rec.testimonial, rec.highlights)"></div>
              
              <div *ngIf="rec.highlights && rec.highlights.length > 0" class="highlights">
                <h4>Points clés :</h4>
                <ul>
                  <li *ngFor="let highlight of rec.highlights">{{ highlight }}</li>
                </ul>
              </div>
            </div>

            <!-- Quote Icon -->
            <div class="quote-icon">
              <i class="fad fa-quote-right"></i>
            </div>
          </div>
        </div>

        <!-- Humor Footer -->
        <footer class="humor-footer">
          <p>Wow, vous êtes encore là ? 👏</p>
        </footer>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent implements OnChanges {
  @Input() lang: 'fr' | 'en' = 'fr';
  data: CVData | null = null;
  loading = true;
  error: string | null = null;

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

  navigateHome(): void {
    this.router.navigate(['/']);
  }
}