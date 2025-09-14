import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MarkdownPipe } from '../../pipes/markdown.pipe';

interface ExperienceTask {
  category: string;
  tasks: string[];
}

interface ExperienceDescription {
  [clientName: string]: ExperienceTask[];
}

interface Experience {
  company: string;
  logo: string;
  position: string;
  period: string;
  description: ExperienceDescription[];
  skills: string[];
}

@Component({
  selector: 'app-experiences',
  standalone: true,
  imports: [CommonModule, TranslateModule, MarkdownPipe],
  template: `
        <section class="main-section">
          <h2 class="main-section-title clickable-title" (click)="toggleExperiencesSection()">
            <i class="fal fa-briefcase"></i>
            {{ variant === 'short' ? ('i18n.ui.sections.experiences_short' | translate) : ('i18n.ui.sections.experiences_long' | translate) }}
            <i class="fad" [class.fa-chevron-down]="experiencesSectionExpanded" [class.fa-chevron-right]="!experiencesSectionExpanded"></i>
          </h2>
        <div *ngIf="experiencesSectionExpanded">
      
      <div class="experiences-container">
        <div *ngFor="let experience of displayedExperiences" class="experience-item">
          <div class="experience-header">
            <div class="experience-company-info">
              <img 
                [src]="getCompanyLogo(experience.company)" 
                [alt]="experience.company + ' logo'"
                class="company-logo"
                (error)="onImageError($event)"
              />
              <div class="experience-info">
                <h3 class="experience-company">{{ experience.company }}</h3>
                <div class="experience-position">{{ experience.position }}</div>
              </div>
            </div>
            <span class="experience-period">{{ experience.period }}</span>
          </div>
          
          <div class="experience-description">
            <div *ngFor="let descriptionGroup of experience.description" class="description-group">
              <div *ngFor="let clientEntry of getClientEntries(descriptionGroup)" class="client-section">
                <h4 *ngIf="clientEntry.clientName !== 'N/A'" class="client-name">{{ clientEntry.clientName }}</h4>
                
                <div *ngFor="let task of clientEntry.tasks" class="task-category">
                  <h5 class="category-title">{{ task.category }}</h5>
                  <ul class="task-list">
                    <li *ngFor="let taskItem of task.tasks" [innerHTML]="formatTask(taskItem)"></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div class="experience-skills">
            <span class="skills-label">{{ 'i18n.ui.experiences.skills' | translate }} :</span>
            <div class="skills-tags">
              <span *ngFor="let skill of experience.skills" class="skill-tag">{{ skill }}</span>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  `,
  styleUrls: ['./experiences.component.css']
})
export class ExperiencesComponent {
  @Input() variant: 'short' | 'full' = 'short';

  private translateService = inject(TranslateService);
  experiences: Experience[] = [];
  experiencesSectionExpanded = true;
  
  ngOnInit() {
    this.loadExperiences();
  }
  
  ngOnChanges() {
    this.loadExperiences();
  }
  
  get displayedExperiences(): Experience[] {
    if (this.variant === 'short') {
      return this.experiences.slice(0, 3);
    }
    return this.experiences;
  }
  
  private loadExperiences() {
    this.translateService.get('i18n').subscribe((data: any) => {
      this.experiences = data?.cv?.experiences || [];
    });
  }
  
  getClientEntries(descriptionGroup: ExperienceDescription): { clientName: string, tasks: ExperienceTask[] }[] {
    return Object.entries(descriptionGroup).map(([clientName, tasks]) => ({
      clientName,
      tasks
    }));
  }
  
  formatTask(task: string): string {
    return task.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  }
  
  getCompanyLogo(company: string): string {
    // Utilisation de logos SVG simples en attendant une solution CORS
    const logoMap: { [key: string]: string } = {
      'Dougs': 'data:image/svg+xml;base64,' + btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="#3b82f6" rx="12"/><text x="50" y="60" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="24" font-weight="bold">D</text></svg>`),
      'SantéVet': 'data:image/svg+xml;base64,' + btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="#2563eb" rx="12"/><text x="50" y="60" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="20" font-weight="bold">SV</text></svg>`),
      'ManoMano': 'data:image/svg+xml;base64,' + btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="#60a5fa" rx="12"/><text x="50" y="60" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="20" font-weight="bold">MM</text></svg>`),
      'onepoint': 'data:image/svg+xml;base64,' + btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="#1d4ed8" rx="12"/><text x="50" y="60" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="20" font-weight="bold">OP</text></svg>`)
    };
    
    return logoMap[company] || '';
  }
  
  onImageError(event: any): void {
    event.target.style.display = 'none';
  }

  toggleExperiencesSection(): void {
    this.experiencesSectionExpanded = !this.experiencesSectionExpanded;
  }
}