import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

interface Experience {
  company: string;
  position: string;
  period: string;
  description: string;
  achievements?: string[];
  technologies?: string[];
  logo?: string;
}

interface Education {
  degree: string;
  school: string;
  year: string;
  specialization?: string;
}

interface Certification {
  name: string;
  issuer: string;
  year: string;
}

interface CVData {
  experiencesLong?: Experience[];
  education: Education[];
  certifications?: Certification[];
}

@Component({
  selector: 'app-detailed-experiences',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <div class="detailed-experiences-container">
      <!-- Loading State -->
      <div *ngIf="loading" class="loading-card">
        <i class="fad fa-spinner fa-spin"></i>
        <span>Chargement des expériences détaillées...</span>
      </div>

      <!-- Error State -->
      <div *ngIf="error" class="error-state">
        <div class="error-card">
          <i class="fad fa-exclamation-triangle"></i>
          <h3>Erreur</h3>
          <p>{{ error }}</p>
        </div>
      </div>

      <!-- Content -->
      <div *ngIf="!loading && !error && data" class="experiences-content">
        <!-- Header -->
        <header class="page-header">
          <div class="header-navigation">
            <button class="back-button" (click)="navigateHome()">
              <i class="fad fa-arrow-left"></i>
              Retour au CV
            </button>
          </div>
          <h1 class="page-title">{{ 'i18n.ui.sections.detailed_experiences' | translate }}</h1>
          <p class="page-subtitle">Parcours professionnel complet et réalisations marquantes</p>
        </header>

        <div class="experiences-content-inner">
          <!-- Two Column Layout -->
          <div class="experiences-layout">
          <div class="column-separator"></div>
          
          <!-- Left Column -->
          <div class="experiences-column left-column">
            <div *ngFor="let exp of getLeftColumnExperiences(); let i = index" class="experience-block">
              <div class="experience-date">
                <i class="fad fa-calendar-alt"></i>
                {{ exp.period }}
              </div>
              <div class="experience-content">
                <div class="experience-header">
                  <img *ngIf="exp.logo" [src]="exp.logo" [alt]="exp.company + ' logo'" class="company-logo">
                  <div class="experience-info">
                    <h3 class="position-title">{{ exp.position }}</h3>
                    <h4 class="company-name">{{ exp.company }}</h4>
                  </div>
                </div>
                <p class="experience-description">{{ exp.description }}</p>
                <div *ngIf="exp.achievements && exp.achievements.length > 0" class="achievements">
                  <h5>{{ 'i18n.ui.sections.key_achievements' | translate }}</h5>
                  <ul>
                    <li *ngFor="let achievement of exp.achievements">{{ achievement }}</li>
                  </ul>
                </div>
                <div *ngIf="exp.technologies && exp.technologies.length > 0" class="technologies">
                  <span class="tech-tag" *ngFor="let tech of exp.technologies">{{ tech }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column -->
          <div class="experiences-column right-column">
            <div *ngFor="let exp of getRightColumnExperiences(); let i = index" class="experience-block">
              <div class="experience-date">{{ exp.period }}</div>
              <div class="experience-content">
                <div class="experience-header">
                  <img *ngIf="exp.logo" [src]="exp.logo" [alt]="exp.company + ' logo'" class="company-logo">
                  <div class="experience-info">
                    <h3 class="position-title">{{ exp.position }}</h3>
                    <h4 class="company-name">{{ exp.company }}</h4>
                  </div>
                </div>
                <p class="experience-description">{{ exp.description }}</p>
                <div *ngIf="exp.achievements && exp.achievements.length > 0" class="achievements">
                  <h5>{{ 'i18n.ui.sections.key_achievements' | translate }}</h5>
                  <ul>
                    <li *ngFor="let achievement of exp.achievements">{{ achievement }}</li>
                  </ul>
                </div>
                <div *ngIf="exp.technologies && exp.technologies.length > 0" class="technologies">
                  <span class="tech-tag" *ngFor="let tech of exp.technologies">{{ tech }}</span>
                </div>
              </div>
            </div>
          </div>
          <!-- Humor Footer -->
          <footer class="humor-footer">
            <p>{{ 'i18n.ui.reading_humor' | translate }}</p>
          </footer>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./detailed-experiences.component.css']
})
export class DetailedExperiencesComponent implements OnChanges {
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
        console.error('Error loading detailed experiences data:', err);
        this.error = 'Erreur lors du chargement des données des expériences';
        this.data = null;
        this.loading = false;
      }
    });
  }

  getLeftColumnExperiences(): Experience[] {
    if (!this.data?.experiencesLong) return [];
    const experiences = this.data.experiencesLong;
    const half = Math.ceil(experiences.length / 2);
    return experiences.slice(0, half);
  }

  getRightColumnExperiences(): Experience[] {
    if (!this.data?.experiencesLong) return [];
    const experiences = this.data.experiencesLong;
    const half = Math.ceil(experiences.length / 2);
    return experiences.slice(half);
  }

  navigateHome(): void {
    this.router.navigate(['/']);
  }
}