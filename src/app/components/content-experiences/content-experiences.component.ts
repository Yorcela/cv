import { Component, ChangeDetectionStrategy, inject, input, output, signal, effect, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MarkdownPipe } from '../../pipes/markdown.pipe';
import { CVVariant, VariantType } from '../../types/common.types';
import { ExperienceTask, ExperienceDescription, ExperienceWithDescription } from './content-experiences.component.interface';

@Component({
  selector: 'app-content-experiences',
  standalone: true,
  imports: [CommonModule, TranslateModule, MarkdownPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './content-experiences.component.html',
  styleUrls: ['./content-experiences.component.scss']
})
export class ContentExperiencesComponent {
  readonly CVVariant = CVVariant;
  
  variant = input<VariantType>(CVVariant.SHORT);
  data = input<any>(null);
  isExpanded = input<boolean>(true);
  toggleSection = output<void>();
  
  private _experiences = signal<ExperienceWithDescription[]>([]);
  experiences = this._experiences.asReadonly();
  
  private readonly translateService = inject(TranslateService);
  
  constructor() {
    effect(() => {
      this.translateService.get('cv').subscribe((data: any) => {
        this._experiences.set(data?.experiences || []);
      });
    }, { allowSignalWrites: true });
  }
  
  displayedExperiences = computed(() => {
    const experiences = this.experiences();
    if (this.variant() === CVVariant.SHORT) {
      return experiences.slice(0, 3);
    }
    return experiences;
  });
  
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