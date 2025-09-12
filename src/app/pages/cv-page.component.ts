import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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
      <div *ngIf="loading" class="loading-state">
        <div class="loading-card">
          <i class="fas fa-spinner fa-spin"></i>
          <span>Chargement du CV...</span>
        </div>
      </div>
      
      <div *ngIf="error" class="error-state">
        <div class="error-card">
          <i class="fas fa-exclamation-triangle"></i>
          <h3>Erreur de chargement</h3>
          <p>{{ error }}</p>
        </div>
      </div>
      
      <div *ngIf="!loading && !error && data" class="cv-content">
        <!-- Header Full-Width -->
        <header class="cv-header">
          <div class="header-container">
            <div class="profile-section">
              <div class="profile-photo-container">
                <img src="assets/images/profile-photo.png" alt="{{ data.personalInfo.name }}" class="profile-photo">
              </div>
              <div class="profile-info">
                <h1 class="name">{{ data.personalInfo.name }}</h1>
                <h2 class="title">Agile & Lean Leader</h2>
              </div>
            </div>
            <div class="contact-info">
              <div class="contact-item">
                <i class="fas fa-envelope"></i>
                <a [href]="'mailto:' + data.personalInfo.email">{{ data.personalInfo.email }}</a>
              </div>
              <div class="contact-item">
                <i class="fas fa-phone"></i>
                <span>{{ data.personalInfo.phone }}</span>
              </div>
              <div class="contact-item">
                <i class="fas fa-map-marker-alt"></i>
                <span>{{ data.personalInfo.location }}</span>
              </div>
              <div class="contact-item">
                <i class="fab fa-linkedin"></i>
                <a [href]="'https://' + data.personalInfo.linkedin" target="_blank" rel="noopener">LinkedIn</a>
              </div>
              <div class="contact-item">
                <i class="fab fa-youtube"></i>
                <a [href]="data.personalInfo.youtube" target="_blank" rel="noopener">YouTube</a>
              </div>
              <div class="contact-item">
                <i class="fas fa-chart-line"></i>
                <a [href]="data.personalInfo.assessfirst" target="_blank" rel="noopener">AssessFirst</a>
              </div>
            </div>
          </div>
        </header>

        <!-- Main Content -->
        <div class="cv-main">
          <!-- About Section -->
          <section class="about-section">
            <h2 class="section-title">
              <i class="fas fa-user"></i>
              Qui je suis
            </h2>
            <div class="about-content">
              <p class="about-text" [innerHTML]="getFormattedAbout()"></p>
            </div>
          </section>

          <!-- Experiences Section -->
          <section class="experiences-section">
            <h2 class="section-title">
              <i class="fas fa-briefcase"></i>
              Expériences professionnelles
            </h2>
            <div class="experience-item" *ngFor="let exp of variant === 'full' ? data.experiencesLong : data.experiencesShort">
              <div class="experience-header">
                <div class="experience-main">
                  <h4 class="position">{{ exp.position }}</h4>
                  <div class="company">{{ exp.company }}</div>
                  <div class="location">{{ exp.location }}</div>
                </div>
                <div class="period">{{ exp.period }}</div>
              </div>
              <div class="experience-description">
                <p>{{ exp.description }}</p>
                <ul *ngIf="exp.achievements && exp.achievements.length > 0">
                  <li *ngFor="let achievement of exp.achievements">{{ achievement }}</li>
                </ul>
              </div>
            </div>
          </section>

          <!-- Skills Section -->
          <section class="skills-section">
            <h2 class="section-title">
              <i class="fas fa-cogs"></i>
              Compétences
            </h2>
            <div class="skills-grid">
              <div class="skills-column">
                <div class="skill-category">
                  <h3><i class="fas fa-rocket"></i> Delivery & Management</h3>
                  <div class="skills-list">
                    <span class="skill-tag" *ngFor="let skill of data.skills.leadership">{{ skill }}</span>
                  </div>
                </div>
                <div class="skill-category">
                  <h3><i class="fas fa-sync-alt"></i> Agilité</h3>
                  <div class="skills-list">
                    <span class="skill-tag" *ngFor="let skill of data.skills.business">{{ skill }}</span>
                  </div>
                </div>
              </div>
              <div class="skills-column">
                <div class="skill-category">
                  <h3><i class="fas fa-laptop-code"></i> Compétences Tech</h3>
                  <div class="skills-list">
                    <span class="skill-tag" *ngFor="let skill of data.skills.technical">{{ skill }}</span>
                  </div>
                </div>
                <div class="skill-category">
                  <h3><i class="fas fa-globe"></i> Langues</h3>
                  <div class="skills-list">
                    <span class="skill-tag" *ngFor="let lang of data.languages">{{ lang.language }} ({{ lang.level }})</span>
                  </div>
                </div>
              </div>
             </div>
            </section>

            <!-- Education and Certifications Section -->
            <div class="education-certifications-row">
              <section class="education-section">
                <h2 class="section-title">
                  <i class="fas fa-graduation-cap"></i>
                  Formation
                </h2>
                <div class="section-content">
                  <div class="education-item" *ngFor="let edu of data.education">
                    <h4 class="degree">{{ edu.degree }}</h4>
                    <div class="school">{{ edu.school }}</div>
                    <div class="year">{{ edu.year }}</div>
                    <div class="specialization" *ngIf="edu.specialization">{{ edu.specialization }}</div>
                  </div>
                </div>
              </section>

              <section class="certifications-section">
                <h2 class="section-title">
                  <i class="fas fa-certificate"></i>
                  Certifications
                </h2>
                <div class="section-content">
                  <div class="certification-item" *ngFor="let cert of data.certifications">
                    <h4 class="certification-name">{{ cert.name }}</h4>
                    <div class="certification-issuer">{{ cert.issuer }}</div>
                    <div class="certification-year">{{ cert.year }}</div>
                  </div>
                </div>
              </section>
            </div>

            <!-- Hobbies Section -->
            <section class="hobbies-section">
              <h2 class="section-title">
                <i class="fas fa-heart"></i>
                Loisirs
              </h2>
              <div class="section-content">
                <div class="hobbies-list">
                  <span class="hobby-item" *ngFor="let hobby of data.hobbies; let last = last">
                    {{ hobby }}<span *ngIf="!last"> • </span>
                  </span>
                </div>
              </div>
            </section>

            <!-- Navigation to Other Pages -->
            <section class="navigation-section">
              <h2 class="section-title">
                <i class="fas fa-compass"></i>
                Explorer plus
              </h2>
              <div class="navigation-cards">
                <div class="nav-card" (click)="navigateToDetailedExperiences()">
                  <div class="nav-card-icon">
                    <i class="fas fa-briefcase"></i>
                  </div>
                  <h3>Expériences détaillées</h3>
                  <p>Découvrez mon parcours professionnel complet avec tous les détails</p>
                  <div class="nav-card-arrow">
                    <i class="fas fa-arrow-right"></i>
                  </div>
                </div>
                
                <div class="nav-card" (click)="navigateToRecommendations()">
                  <div class="nav-card-icon">
                    <i class="fas fa-comments"></i>
                  </div>
                  <h3>Recommandations</h3>
                  <p>Lisez les témoignages de mes managers et collègues</p>
                  <div class="nav-card-arrow">
                    <i class="fas fa-arrow-right"></i>
                  </div>
                </div>
              </div>
            </section>
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
  accomplishmentsExpanded = false;
  recommendationsExpanded = false;

  constructor(private http: HttpClient, private router: Router) {}

  toggleAccomplishments(): void {
    this.accomplishmentsExpanded = !this.accomplishmentsExpanded;
  }

  toggleRecommendations(): void {
    this.recommendationsExpanded = !this.recommendationsExpanded;
  }

  getFormattedAbout(): string {
    if (!this.data) return '';
    const aboutText = this.variant === 'full' ? this.data.aboutLong?.description : this.data.aboutShort?.description;
    if (!aboutText) return '';
    
    // Mots-clés à mettre en emphase
    const keywords = [
      'Agile', 'Lean', 'Scrum', 'Kanban', 'DevOps', 'Leadership', 'Management',
      'Product Owner', 'Scrum Master', 'Engineering Manager', 'Tech Lead',
      'Transformation digitale', 'Innovation', 'Équipe', 'Coaching',
      'Delivery', 'Performance', 'Qualité', 'Continuous Improvement'
    ];
    
    let formattedText = aboutText;
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      formattedText = formattedText.replace(regex, `<strong class="keyword">${keyword}</strong>`);
    });
    
    return formattedText;
  }

  navigateToDetailedExperiences(): void {
    this.router.navigate(['/experiences-detaillees']);
  }

  navigateToRecommendations(): void {
    this.router.navigate(['/recommandations']);
  }

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
