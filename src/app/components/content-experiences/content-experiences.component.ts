import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
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
  selector: 'app-content-experiences',
  standalone: true,
  imports: [CommonModule, TranslateModule, MarkdownPipe],
  template: `
        <section class="main-section">
          <h2 class="main-section-title clickable-title" (click)="onToggleSection()">
            <i class="fad fa-briefcase"></i>
            {{ variant === 'short' ? ('i18n.ui.sections.experiences_short' | translate) : ('i18n.ui.sections.experiences_long' | translate) }}
            <i class="fad" [class.fa-chevron-down]="isExpanded" [class.fa-chevron-right]="!isExpanded"></i>
          </h2>
        <div *ngIf="isExpanded">
      
      <div class="experiences-container">
        <div *ngFor="let experience of displayedExperiences" class="experience-item">
          <div class="experience-header">
            <div class="experience-company-info">
              <img 
                [src]="experience.logo" 
                [alt]="experience.company + ' logo'"
                class="company-logo"
                (error)="onImageError($event)"
              />
              <div class="experience-info">
                <h3 class="experience-company">{{ experience.company }}</h3>
                <div class="experience-period">{{ experience.period }}</div>
              </div>
            </div>
            <span class="experience-position">{{ experience.position }}</span>
          </div>
          
          <div class="experience-description">
            <div *ngFor="let descriptionGroup of experience.description" class="description-group">
              <div *ngFor="let clientEntry of getClientEntries(descriptionGroup)" class="client-section">
                <h4 *ngIf="clientEntry.clientName !== 'N/A'" class="client-name">{{ clientEntry.clientName }}</h4>
                
                <div *ngFor="let task of clientEntry.tasks" class="task-category">
                  <h5 class="category-title">{{ task.category }}</h5>
                  <ul class="task-list-simple">
                    <li *ngFor="let taskItem of task.tasks" [innerHTML]="formatTask(taskItem)"></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div class="experience-skills">
            <div class="skills-tags">
              <span *ngFor="let skill of experience.skills" class="skill-tag-small">{{ skill }}</span>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  `,
  styleUrls: ['./content-experiences.component.scss']
})
export class ContentExperiencesComponent {
  @Input() variant: 'short' | 'full' = 'short';
  @Input() data: any = null;
  @Input() isExpanded: boolean = true;
  @Output() toggleSection = new EventEmitter<void>();

  private translateService = inject(TranslateService);
  experiences: Experience[] = [];
  
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
    this.translateService.get('cv').subscribe((data: any) => {
      this.experiences = data?.experiences || [];
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
  
  onImageError(event: any): void {
    event.target.style.display = 'none';
  }

  onToggleSection(): void {
    this.toggleSection.emit();
  }
}