import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MarkdownPipe } from '../pipes/markdown.pipe';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { AboutMeComponent } from '../components/aboute-me/about-me.component';
import { AccomplishmentsComponent } from '../components/accomplishments/accomplishments.component';
import { ExperiencesComponent } from '../components/experiences/experiences.component';

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
  imports: [CommonModule, TranslateModule, MarkdownPipe, SidebarComponent, AboutMeComponent, AccomplishmentsComponent, ExperiencesComponent],
  template: `
    <div class="page-background">
      <div class="cv-container">
      <div *ngIf="loading" class="loading-state">
        <div class="loading-card">
          <i class="fad fa-spinner fa-spin"></i>
          <span>{{ 'i18n.ui.loading' | translate }}</span>
        </div>
      </div>
      
      <div *ngIf="error" class="error-state">
        <div class="error-card">
          <i class="fad fa-exclamation-triangle"></i>
          <h3>{{ 'i18n.ui.error_loading' | translate }}</h3>
          <p>{{ error }}</p>
        </div>
      </div>
      
      <div *ngIf="!loading && !error && data" class="cv-content">
        <!-- Left Sidebar -->
        <div class="app-sidebar">
          <app-sidebar [personalInfo]="data.personalInfo" [hobbies]="data.hobbies || []"></app-sidebar>
        </div>

          <!-- Main Content -->
          <div class="cv-main">
            <app-about-me [variant]="variant"></app-about-me>
            <app-accomplishments [variant]="variant"></app-accomplishments>
            <app-experiences [variant]="variant"></app-experiences>

            <!-- Recommendations Section -->
            <section class="main-section">
              <h2 class="main-section-title clickable-title" (click)="toggleRecommendationsSection()">
                <i class="fal fa-quote-left"></i>
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
  recommendationsSectionExpanded = true;

  constructor(private http: HttpClient, private router: Router) {}

  toggleAccomplishments(): void {
    this.accomplishmentsExpanded = !this.accomplishmentsExpanded;
  }

  toggleRecommendations(): void {
    this.recommendationsExpanded = !this.recommendationsExpanded;
  }

  toggleRecommendationsSection(): void {
    this.recommendationsSectionExpanded = !this.recommendationsSectionExpanded;
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
            icon = 'fad fa-sync-alt';
            break;
          case 'Coaching Agile':
            title = 'Coaching Agile';
            icon = 'fad fa-chalkboard-teacher';
            break;
          case 'Leadership/Management':
            title = 'Leadership/Management';
            icon = 'fad fa-users';
            break;
          case 'Delivery':
            title = 'Delivery';
            icon = 'fad fa-shipping-fadt';
            break;
          case 'Communication':
            title = 'Communication';
            icon = 'fad fa-comments';
            break;
          case 'Tech':
            title = 'Tech';
            icon = 'fad fa-code';
            break;
          case 'Langues':
            title = 'Langues';
            icon = 'fad fa-globe';
            break;
          default:
            title = key;
            icon = 'fad fa-star';
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
