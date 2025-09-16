import { Component, Input, OnChanges, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MarkdownPipe } from '../pipes/markdown.pipe';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { ContentAboutMeComponent } from '../components/content-about-me/content-about-me.component';
import { ContentAccomplishmentsComponent } from '../components/content-accomplishments/content-accomplishments.component';
import { ContentExperiencesComponent } from '../components/content-experiences/content-experiences.component';
import { ContentRecommendationsComponent } from '../components/content-recommendations/content-recommendations.component';
import { CVVariant, VariantType, CVLanguage, LanguageType } from '../types/common.types';
import { CVData } from './main-page.component.interface';
import { SkillCategory } from '../components/sidebar-skills/sidebar-skills.component.interface';
import { Experience } from '../components/content-experiences/content-experiences.component.interface';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule, TranslateModule, MarkdownPipe, SidebarComponent, ContentAboutMeComponent, ContentAccomplishmentsComponent, ContentExperiencesComponent, ContentRecommendationsComponent],
  templateUrl: `./main-page.component.html`,
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnChanges, OnInit {
  @Input() lang: LanguageType = CVLanguage.FR;
  @Input() variant: VariantType = CVVariant.FULL;
  data: CVData | null = null;
  loading = true;
  error: string | null = null;
  accomplishmentsExpanded = false;
  recommendationsExpanded = false;

  sectionStates: { [key: string]: boolean } = {
    about: true,
    experiences: true,
    accomplishments: true,
    recommendations: false
  };

  ngOnInit(): void {
    if (this.variant === CVVariant.FULL) {
      this.sectionStates['recommendations'] = true;
    }
  }

  constructor(private http: HttpClient, private router: Router) { }

  toggleSection(section: 'about' | 'experiences' | 'accomplishments' | 'recommendations'): void {
    this.sectionStates[section] = !this.sectionStates[section];
  }

  isSectionExpanded(section: 'about' | 'experiences' | 'accomplishments' | 'recommendations'): boolean {
    return this.sectionStates[section];
  }

  toggleAccomplishments(): void {
    this.accomplishmentsExpanded = !this.accomplishmentsExpanded;
  }

  toggleRecommendations(): void {
    this.recommendationsExpanded = !this.recommendationsExpanded;
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
    return this.variant === CVVariant.SHORT
      ? this.data.aboutShort?.description || ''
      : this.data.aboutLong?.description || '';
  }

  getExperiences(): Experience[] {
    if (!this.data) return [];
    return this.variant === CVVariant.SHORT
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

        switch (key) {
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
