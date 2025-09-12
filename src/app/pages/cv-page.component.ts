import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MarkdownPipe } from '../pipes/markdown.pipe';

interface ExperienceDetailed {
  title: string;
  details?: string[];
  isSubheading?: boolean;
}

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
  experiencesDetailed?: {
    title: string;
    content: ExperienceDetailed[];
  };
  skills: {
    agile: string;
    coaching: string;
    leadership: string;
    delivery: string;
    communication: string;
    tech: string;
    languages: string;
  };
  accomplishments: Accomplishment[];
  recommendations: Recommendation[];
  education: Education[];
  languages: Language[];
  hobbies?: string[];
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
  imports: [CommonModule, TranslateModule, MarkdownPipe],
  template: `
    <div class="page-background">
      <div class="cv-container">
      <div *ngIf="loading" class="loading-state">
        <div class="loading-card">
          <i class="fas fa-spinner fa-spin"></i>
          <span>{{ 'sections.loading' | translate }}</span>
        </div>
      </div>
      
      <div *ngIf="error" class="error-state">
        <div class="error-card">
          <i class="fas fa-exclamation-triangle"></i>
          <h3>{{ 'sections.error_loading' | translate }}</h3>
          <p>{{ error }}</p>
        </div>
      </div>
      
      <div *ngIf="!loading && !error && data" class="cv-content">
        <!-- Left Sidebar -->
        <div class="cv-sidebar">
          <!-- Profile Section -->
          <div class="profile-section">
            <div class="profile-photo-container">
              <img src="assets/images/profile-photo.png" alt="{{ data.personalInfo.name }}" class="profile-photo">
            </div>
            <h1 class="name">{{ data.personalInfo.name }}</h1>
            <h2 class="title">{{ data.personalInfo.title }}</h2>
          </div>
          
          <!-- Contact Info -->
          <div class="contact-section">
            <div class="contact-item">
              <i class="fal fa-phone"></i>
              <span>{{ data.personalInfo.phone }}</span>
            </div>
            <div class="contact-item">
              <i class="fal fa-envelope"></i>
              <a href="mailto:{{ data.personalInfo.email }}">{{ data.personalInfo.email }}</a>
            </div>
            <div class="contact-item">
              <i class="fal fa-map-marker-alt"></i>
              <span>{{ data.personalInfo.location }}</span>
            </div>
            <div class="contact-item">
              <i class="fab fa-linkedin"></i>
              <a href="{{ data.personalInfo.linkedin }}" target="_blank">{{ 'sections.linkedin' | translate }}</a>
            </div>
            <div class="contact-item" *ngIf="data.personalInfo.github">
              <i class="fab fa-github"></i>
              <a href="{{ data.personalInfo.github }}" target="_blank">{{ 'sections.github' | translate }}</a>
            </div>
          </div>
          
          <!-- Skills Section -->
          <div class="sidebar-skills">
            <h3 class="sidebar-title"><i class="fal fa-cogs"></i> {{ 'sections.skills' | translate }}</h3>
            <div class="skills-chips-container">
              <span class="skill-chip-xs">Scaled Agile (SAFe, LeSS, Nexus, unFIX)</span>
              <span class="skill-chip-xs">Lean</span>
              <span class="skill-chip-xs">Scrum</span>
              <span class="skill-chip-xs">Coaching (équipes & individus)</span>
              <span class="skill-chip-xs">Servant leader</span>
              <span class="skill-chip-xs">Mentoring</span>
              <span class="skill-chip-xs">Career development</span>
              <span class="skill-chip-xs">Autonomisation</span>
              <span class="skill-chip-xs">OKRs</span>
              <span class="skill-chip-xs">Multi‑team coordination</span>
              <span class="skill-chip-xs">Roadmaps</span>
              <span class="skill-chip-xs">Delivery</span>
              <span class="skill-chip-xs">Facilitation</span>
              <span class="skill-chip-xs">Formation</span>
              <span class="skill-chip-xs">Node.js</span>
              <span class="skill-chip-xs">TypeScript</span>
              <span class="skill-chip-xs">PostgreSQL</span>
              <span class="skill-chip-xs">Docker</span>
              <span class="skill-chip-xs">Français</span>
              <span class="skill-chip-xs">Anglais</span>
            </div>
          </div>
          
          <!-- Education & Certifications Section -->
          <div class="sidebar-education">
            <h3 class="sidebar-title"><i class="fal fa-graduation-cap"></i> {{ 'sections.education_certifications' | translate }}</h3>
            <div class="education-content">
              <div class="education-subsection">
                <h4 class="education-subtitle"><i class="fal fa-university"></i> {{ 'sections.education' | translate }}</h4>
                <div class="education-item">
                  <div class="education-degree">Chef de projet informatique (niveau II)</div>
                  <div class="education-school">Esarc Évolution</div>
                  <div class="education-year">2011</div>
                </div>
                <div class="education-item">
                  <div class="education-degree">Bac Communication et Gestion des RH</div>
                  <div class="education-school">Lycée Jean Monnet</div>
                  <div class="education-year">2007</div>
                </div>
              </div>
              <div class="education-subsection">
                <h4 class="education-subtitle"><i class="fal fa-certificate"></i> {{ 'sections.certifications' | translate }}</h4>
                <div class="certifications-chips">
                  <div class="certification-chip">
                    <span class="chip-text">PSM II</span>
                    <span class="chip-badge">2021</span>
                  </div>
                  <div class="certification-chip">
                    <span class="chip-text">SAFe Agilist</span>
                    <span class="chip-badge">2020</span>
                  </div>
                  <div class="certification-chip">
                    <span class="chip-text">PSM I</span>
                    <span class="chip-badge">2020</span>
                  </div>
                  <div class="certification-chip">
                    <span class="chip-text">PSPO I</span>
                    <span class="chip-badge">2020</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Hobbies Section -->
          <div class="sidebar-hobbies">
            <h3 class="sidebar-title"><i class="fal fa-heart"></i> {{ 'sections.hobbies' | translate }}</h3>
            <div class="hobbies-list">
              <div class="hobby-item" *ngFor="let hobby of data.hobbies">
                <i class="fas" [ngClass]="{
                  'fa-tv': hobby.toLowerCase().includes('kaamelott'),
                  'fa-gamepad': hobby.toLowerCase().includes('tft'),
                  'fa-hammer': hobby.toLowerCase().includes('bricolage'),
                  'fa-seedling': hobby.toLowerCase().includes('jardinage'),
                  'fa-palette': hobby.toLowerCase().includes('tatouage'),
                  'fa-film': hobby.toLowerCase().includes('cinema') || hobby.toLowerCase().includes('cinéma'),
                  'fa-desktop': hobby.toLowerCase().includes('series') || hobby.toLowerCase().includes('séries'),
                  'fa-heart': !hobby.toLowerCase().includes('kaamelott') && !hobby.toLowerCase().includes('tft') && !hobby.toLowerCase().includes('bricolage') && !hobby.toLowerCase().includes('jardinage') && !hobby.toLowerCase().includes('tatouage') && !hobby.toLowerCase().includes('cinema') && !hobby.toLowerCase().includes('cinéma') && !hobby.toLowerCase().includes('series') && !hobby.toLowerCase().includes('séries')
                }"></i>
                {{ hobby }}
              </div>
            </div>
          </div>
        </div>

          <!-- Main Content -->
          <div class="cv-main">
            <!-- About Section -->
            <section class="main-section">
              <h2 class="main-section-title">
                <i class="fal fa-user"></i>
                {{ 'sections.about_me' | translate }}
              </h2>
              <div class="section-content">
                <div [innerHTML]="getFormattedAbout()"></div>
              </div>
            </section>

            <!-- Accomplishments Section -->
            <section class="main-section">
              <h2 class="main-section-title">
                <i class="fal fa-trophy"></i>
                {{ 'sections.accomplishments' | translate }}
              </h2>
              <div class="accomplishments-grid">
                <div class="accomplishment-category">
                  <h4><i class="fal fa-rocket"></i> {{ 'sections.transformation' | translate }}</h4>
                  <ul>
                    <li *ngFor="let acc of getAccomplishmentsByCategory('transformation')">
                      {{ acc.title }} ({{ acc.year }})
                    </li>
                  </ul>
                </div>
                <div class="accomplishment-category">
                  <h4><i class="fal fa-users"></i> {{ 'sections.leadership' | translate }}</h4>
                  <ul>
                    <li *ngFor="let acc of getAccomplishmentsByCategory('leadership')">
                      {{ acc.title }} ({{ acc.year }})
                    </li>
                  </ul>
                </div>
                <div class="accomplishment-category">
                  <h4><i class="fal fa-cogs"></i> {{ 'sections.innovation' | translate }}</h4>
                  <ul>
                    <li *ngFor="let acc of getAccomplishmentsByCategory('innovation')">
                      {{ acc.title }} ({{ acc.year }})
                    </li>
                  </ul>
                </div>
                <div class="accomplishment-category">
                  <h4><i class="fal fa-chart-line"></i> {{ 'sections.performance' | translate }}</h4>
                  <ul>
                    <li *ngFor="let acc of getAccomplishmentsByCategory('performance')">
                      {{ acc.title }} ({{ acc.year }})
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <!-- Experiences Section -->
            <section class="main-section">
              <h2 class="main-section-title">
                <i class="fal fa-briefcase"></i>
                {{ 'sections.detailed_experiences' | translate }}
              </h2>
              <div class="experiences-container">
                <div *ngFor="let exp of getExperiences()" class="experience-item">
                  <div class="experience-header">
                    <div>
                      <h3 class="experience-title">{{ exp.position }}</h3>
                      <div class="experience-company">{{ exp.company }}</div>
                    </div>
                    <span class="experience-period">{{ exp.period }}</span>
                  </div>
                  <p class="experience-description">{{ exp.description }}</p>
                  <div *ngIf="exp.achievements" class="experience-achievements">
                    <h4>{{ 'sections.key_achievements' | translate }}</h4>
                    <ul>
                      <li *ngFor="let achievement of exp.achievements" [innerHTML]="formatAchievement(achievement)"></li>
                    </ul>
                  </div>
                  <div *ngIf="exp.technologies" class="experience-technologies">
                    <span class="tech-label">{{ 'sections.technologies' | translate }}</span>
                    <span class="tech-tags">
                      <span *ngFor="let tech of exp.technologies" class="tech-tag">{{ tech }}</span>
                    </span>
                  </div>
                </div>
              </div>
            </section>



            <!-- Recommendations Section -->
            <section class="main-section">
              <h2 class="main-section-title">
                <i class="fal fa-quote-left"></i>
                {{ 'sections.recommendations' | translate }}
              </h2>
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
    
    // Use markdown pipe for formatting
    const markdownPipe = new MarkdownPipe();
    return markdownPipe.transform(aboutText);
  }

  formatAchievement(achievement: string): string {
    const markdownPipe = new MarkdownPipe();
    return markdownPipe.transform(achievement);
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

  getRecommendations() {
    if (!this.data?.recommendations) return [];
    return this.recommendationsExpanded ? this.data.recommendations : this.data.recommendations.slice(0, 3);
  }



  getAccomplishmentsByCategory(category: string) {
    if (!this.data?.accomplishments) return [];
    
    const categoryMap: { [key: string]: string[] } = {
      'transformation': ['transformation', 'change', 'agile', 'lean', 'process'],
      'leadership': ['leadership', 'team', 'management', 'coaching', 'mentor'],
      'innovation': ['innovation', 'product', 'development', 'creation', 'launch'],
      'performance': ['performance', 'improvement', 'optimization', 'efficiency', 'results']
    };
    
    const keywords = categoryMap[category] || [];
    
    return this.data.accomplishments.filter(acc => 
      keywords.some(keyword => 
        acc.title.toLowerCase().includes(keyword) || 
        acc.description.toLowerCase().includes(keyword)
      )
    ).slice(0, this.accomplishmentsExpanded ? undefined : 3);
  }

  getCompanyLogo(companyName: string): string | null {
    const logoMap: { [key: string]: string } = {
      'Deezer': 'assets/images/logos/deezer.png',
      'Onepoint': 'assets/images/logos/onepoint.png',
      'Santeclair': 'assets/images/logos/santeclair.png',
      'MeteoNews': 'assets/images/logos/meteonews.png',
      'Talan': 'assets/images/logos/talan.png'
    };
    
    return logoMap[companyName] || null;
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
