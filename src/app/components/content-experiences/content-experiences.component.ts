import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MarkdownPipe } from '../../pipes/markdown.pipe';
import { CVVariant, VariantType } from '../../types/common.types';
import { ExperienceTask, ExperienceDescription, ExperienceWithDescription } from './content-experiences.component.interface';

@Component({
  selector: 'app-content-experiences',
  standalone: true,
  imports: [CommonModule, TranslateModule, MarkdownPipe],
  templateUrl: './content-experiences.component.html',
  styleUrls: ['./content-experiences.component.scss']
})
export class ContentExperiencesComponent {
  @Input() variant: VariantType = CVVariant.SHORT;
  @Input() data: any = null;
  @Input() isExpanded: boolean = true;
  @Output() toggleSection = new EventEmitter<void>();


  CVVariant = CVVariant;

  private translateService = inject(TranslateService);
  experiences: ExperienceWithDescription[] = [];
  
  ngOnInit() {
    this.loadExperiences();
  }
  
  ngOnChanges() {
    this.loadExperiences();
  }
  
  get displayedExperiences(): ExperienceWithDescription[] {
    if (this.variant === CVVariant.SHORT) {
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