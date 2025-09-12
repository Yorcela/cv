import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface CVData {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github?: string;
  };
  aboutShort?: { description: string };
  aboutLong?: { description: string };
  experiencesShort?: Experience[];
  experiencesLong?: Experience[];
  skills: {
    technical: string[];
    leadership: string[];
    business: string[];
  };
  accomplishments: Accomplishment[];
  recommendations: Recommendation[];
  education: Education[];
  languages: Language[];
}

interface Experience {
  company: string;
  position: string;
  period: string;
  description: string;
  achievements?: string[];
  technologies: string[];
}

interface Accomplishment {
  title: string;
  description: string;
  year: string;
}

interface Recommendation {
  name: string;
  position: string;
  company?: string;
  text: string;
  relationship?: string;
  date: string;
  linkedinUrl?: string;
  photo?: string;
}

interface Education {
  degree: string;
  school: string;
  year: string;
  specialization?: string;
}

interface Language {
  language: string;
  level: string;
}

interface SkillCategory {
  title: string;
  icon: string;
  skills: string[];
}

@Component({
  selector: 'app-cv-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="cv-container">
      <div class="cv-content">
        <div *ngIf="loading" class="loading">
          <i class="fas fa-spinner fa-spin"></i> Chargement du CV...
        </div>
        
        <div *ngIf="error" class="error">
          <i class="fas fa-exclamation-triangle"></i> {{ error }}
        </div>
        
        <div *ngIf="!loading && !error && data">
          <!-- Header Section -->
          <header class="cv-header">
            <div class="header-content">
              <div class="profile-section">
                <div class="profile-photo-container">
                  <div class="profile-photo-wrapper">
                    <img src="assets/images/profile-photo.png" alt="{{ data.personalInfo.name }}" class="profile-photo">
                  </div>
                </div>
                <div class="profile-info">
                  <h1 class="name">{{ data.personalInfo.name }}</h1>
                  <h2 class="title">{{ data.personalInfo.title }}</h2>
                </div>
              </div>
              <div class="contact-info">
                <div class="contact-item">
                  <i class="fas fa-envelope"></i>
                  <a [href]="'mailto:' + data.personalInfo.email">{{ data.personalInfo.email }}</a>
                </div>
                <div class="contact-item">
                  <i class="fas fa-phone"></i>
                  <a [href]="'tel:' + data.personalInfo.phone">{{ data.personalInfo.phone }}</a>
                </div>
                <div class="contact-item">
                  <i class="fas fa-map-marker-alt"></i>
                  <span>{{ data.personalInfo.location }}</span>
                </div>
                <div class="contact-item">
                  <i class="fab fa-linkedin"></i>
                  <a [href]="data.personalInfo.linkedin" target="_blank" rel="noopener">LinkedIn</a>
                </div>
                <div class="contact-item" *ngIf="data.personalInfo.github">
                  <i class="fab fa-github"></i>
                  <a [href]="data.personalInfo.github" target="_blank" rel="noopener">GitHub</a>
                </div>
              </div>
            </div>
          </header>

          <div class="cv-body">

      <!-- About Section -->
      <section class="cv-section about-section">
        <h3 class="section-title">
          <i class="fas fa-user"></i>
          À propos
        </h3>
        <div class="section-content">
          <p class="about-text">{{ getAboutText() }}</p>
        </div>
      </section>

      <!-- Experience Section -->
      <section class="cv-section experience-section">
        <h3 class="section-title">
          <i class="fas fa-briefcase"></i>
          Expérience professionnelle
        </h3>
        <div class="section-content">
          <div class="experience-item" *ngFor="let exp of getExperiences()">
            <div class="experience-header">
              <div class="experience-main">
                <h4 class="position">{{ exp.position }}</h4>
                <h5 class="company">{{ exp.company }}</h5>
              </div>
              <div class="period">{{ exp.period }}</div>
            </div>
            <p class="description">{{ exp.description }}</p>
            <div class="achievements" *ngIf="exp.achievements && exp.achievements.length > 0">
              <h6>Réalisations clés :</h6>
              <ul>
                <li *ngFor="let achievement of exp.achievements">{{ achievement }}</li>
              </ul>
            </div>
            <div class="technologies">
              <span class="tech-tag" *ngFor="let tech of exp.technologies">{{ tech }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Skills Section -->
      <section class="cv-section skills-section">
        <h3 class="section-title">
          <i class="fas fa-cogs"></i>
          Compétences
        </h3>
        <div class="section-content">
          <div class="skills-categories" *ngIf="data.skills">
            <div class="skill-category" *ngFor="let category of getSkillCategories()">
              <h4><i [class]="category.icon"></i> {{ category.title }}</h4>
              <div class="skill-tags">
                <span class="skill-tag" *ngFor="let skill of category.skills">{{ skill }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Education Section -->
      <section class="cv-section education-section">
        <h3 class="section-title">
          <i class="fas fa-graduation-cap"></i>
          Formation
        </h3>
        <div class="section-content">
          <div class="education-item" *ngFor="let edu of data.education">
            <h4 class="degree">{{ edu.degree }}</h4>
            <div class="school">{{ edu.school }}</div>
            <div class="year">{{ edu.year }}</div>
            <div class="specialization" *ngIf="edu.specialization">{{ edu.specialization }}</div>
          </div>
        </div>
      </section>

      <!-- Languages Section -->
      <section class="cv-section languages-section">
        <h3 class="section-title">
          <i class="fas fa-globe"></i>
          Langues
        </h3>
        <div class="section-content">
          <div class="language-item" *ngFor="let lang of data.languages">
            <span class="language-name">{{ lang.language }}</span>
            <span class="language-level">{{ lang.level }}</span>
          </div>
        </div>
      </section>

      <!-- Accomplishments Section -->
      <section class="cv-section accomplishments-section" *ngIf="variant === 'full'">
        <h3 class="section-title">
          <i class="fas fa-trophy"></i>
          Accomplissements
        </h3>
        <div class="section-content">
          <div class="accomplishment-item" *ngFor="let acc of data.accomplishments">
            <div class="accomplishment-header">
              <h4 class="accomplishment-title">{{ acc.title }}</h4>
              <span class="accomplishment-year">{{ acc.year }}</span>
            </div>
            <p class="accomplishment-description">{{ acc.description }}</p>
          </div>
        </div>
      </section>

      <!-- Recommendations Section -->
      <section class="cv-section recommendations-section" *ngIf="variant === 'full'">
        <h3 class="section-title">
          <i class="fas fa-quote-left"></i>
          Recommandations
        </h3>
        <div class="section-content">
          <div class="recommendation-item" *ngFor="let rec of data.recommendations">
            <div class="recommendation-header">
              <div class="recommendation-photo" *ngIf="rec.photo">
                <img [src]="rec.photo" [alt]="rec.name" class="recommender-photo">
              </div>
              <div class="recommendation-author-info">
                <div class="recommendation-author">
                  <strong *ngIf="rec.linkedinUrl; else nameOnly">
                    <a [href]="rec.linkedinUrl" target="_blank" rel="noopener" class="linkedin-link">{{ rec.name }}</a>
                  </strong>
                  <ng-template #nameOnly>
                    <strong>{{ rec.name }}</strong>
                  </ng-template>
                </div>
                <span class="author-details">{{ rec.position }}</span>
                <span class="recommendation-date">{{ rec.date }}</span>
              </div>
            </div>
            <div class="recommendation-content">
              <p class="recommendation-text">"{{ rec.text }}"</p>
            </div>
          </div>
        </div>
      </section>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./cv-page.component.css']
})
export class CvPageComponent implements OnChanges {
  @Input() lang: 'fr' | 'en' = 'fr';
  @Input() variant: 'full' | 'short' = 'full';
  data: CVData | null = null;
  loading = true;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnChanges(): void {
    this.loading = true;
    this.error = null;
    this.loadData();
  }

  private loadData(): void {
    const fileName = `cv-data-${this.lang}.json`;
    this.http.get<CVData>(`assets/data/${fileName}`).subscribe({
      next: (data) => {
        this.data = data;
        this.loading = false;
        this.error = null;
      },
      error: (err) => {
        console.error('Error loading CV data:', err);
        this.error = 'Erreur lors du chargement des données du CV';
        this.data = null;
        this.loading = false;
      }
    });
  }

  getAboutText(): string {
    if (!this.data) return '';
    return this.variant === 'short' 
      ? this.data.aboutShort?.description || ''
      : this.data.aboutLong?.description || '';
  }

  getExperiences(): Experience[] {
    if (!this.data) return [];
    return this.variant === 'short'
      ? this.data.experiencesShort || []
      : this.data.experiencesLong || [];
  }

  getSkillCategories(): SkillCategory[] {
    if (!this.data?.skills) return [];
    
    const categories: SkillCategory[] = [];
    
    // Parcourir toutes les catégories de compétences dans les données
    Object.keys(this.data.skills).forEach(key => {
      const skills = (this.data!.skills as any)[key];
      if (Array.isArray(skills) && skills.length > 0) {
        let title = '';
        let icon = '';
        
        switch(key) {
          case 'Agilité':
            title = 'Agilité';
            icon = 'fas fa-sync-alt';
            break;
          case 'Coaching Agile':
            title = 'Coaching Agile';
            icon = 'fas fa-chalkboard-teacher';
            break;
          case 'Leadership/Management':
            title = 'Leadership/Management';
            icon = 'fas fa-users';
            break;
          case 'Delivery':
            title = 'Delivery';
            icon = 'fas fa-shipping-fast';
            break;
          case 'Communication':
            title = 'Communication';
            icon = 'fas fa-comments';
            break;
          case 'Tech':
            title = 'Tech';
            icon = 'fas fa-code';
            break;
          case 'Langues':
            title = 'Langues';
            icon = 'fas fa-globe';
            break;
          default:
            title = key;
            icon = 'fas fa-star';
        }
        
        categories.push({
          title,
          icon,
          skills
        });
      }
    });
    
    return categories;
  }
}
