import { Component, input, signal, computed, effect, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MarkdownPipe } from '../pipes/markdown.pipe';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { ContentAboutMeComponent } from '../components/content-about-me/content-about-me.component';
import { ContentAccomplishmentsComponent } from '../components/content-accomplishments/content-accomplishments.component';
import { ContentExperiencesComponent } from '../components/content-experiences/content-experiences.component';
import { ContentRecommendationsComponent } from '../components/content-recommendations/content-recommendations.component';
import { CVVariant, VariantType, CVLanguage, LanguageType } from '../types/common.types';
import { CVData } from './main.page.component.interface';
import { SkillCategory } from '../components/sidebar-skills/sidebar-skills.component.interface';
import { Experience } from '../components/content-experiences/content-experiences.component.interface';
import { MainPageService, SectionStates } from './main.page.service';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule, TranslateModule, MarkdownPipe, SidebarComponent, ContentAboutMeComponent, ContentAccomplishmentsComponent, ContentExperiencesComponent, ContentRecommendationsComponent],
  templateUrl: `./main.page.component.html`,
  styleUrl: './main.page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent {
  lang = input<LanguageType>(CVLanguage.FR);
  variant = input<VariantType>(CVVariant.FULL);
  
  data = signal<CVData | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);
  
  sectionStates = signal<SectionStates>({
    about: true,
    experiences: true,
    accomplishments: true,
    recommendations: false
  });
  
  accomplishmentsExpanded = computed(() => this.sectionStates()['accomplishments']);
  recommendationsExpanded = computed(() => this.sectionStates()['recommendations']);

  private mainPageService = inject(MainPageService);

  constructor() {
    effect(() => {
      const variant = this.variant();
      this.sectionStates.set(this.mainPageService.initializeSectionStates(variant));
    }, { allowSignalWrites: true });

    effect(() => {
      const currentLang = this.lang();
      this.loadData();
    }, { allowSignalWrites: true });
  }

  toggleSection(section: keyof SectionStates): void {
    const currentStates = this.sectionStates();
    this.sectionStates.set(this.mainPageService.toggleSection(currentStates, section));
  }

  isSectionExpanded(section: 'about' | 'experiences' | 'accomplishments' | 'recommendations'): boolean {
    return this.sectionStates()[section];
  }

  toggleAccomplishments(): void {
    this.toggleSection('accomplishments');
  }

  toggleRecommendations(): void {
    this.toggleSection('recommendations');
  }





  private loadData(): void {
    this.loading.set(true);
    this.error.set(null);
    
    this.mainPageService.loadData(this.lang()).subscribe(result => {
      this.data.set(result.data);
      this.error.set(result.error);
      this.loading.set(false);
    });
  }

  getAboutText(): string {
    return this.mainPageService.getAboutText(this.data(), this.variant());
  }

  getExperiences(): Experience[] {
    return this.mainPageService.getExperiences(this.data(), this.variant());
  }

  getRecommendations() {
    const currentData = this.data();
    if (!currentData?.recommendations) return [];
    return this.recommendationsExpanded() ? currentData.recommendations : currentData.recommendations.slice(0, 3);
  }

}
