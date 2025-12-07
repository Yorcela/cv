import { Component, ChangeDetectionStrategy, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MarkdownPipe } from '../../pipes/markdown.pipe';
import { CVVariant, VariantType } from '../../types/common.types';
import { ExperienceTask, ExperienceDescription, ExperienceWithDescription, ExperienceSkill, SkillCategory, ExperienceSkillMap, ExperienceSkills } from './content-experiences.component.interface';

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

  private readonly categoryOrder: SkillCategory[] = ['Management', 'Delivery', 'Tech', 'Product & strategy'];

  experiences = computed<ExperienceWithDescription[]>(() => this.data()?.experiences || []);
  
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

  normalizeSkills(skills: ExperienceSkills | null | undefined): ExperienceSkill[] {
    if (!skills) {
      return [];
    }

    if (Array.isArray(skills)) {
      const grouped = new Map<SkillCategory, ExperienceSkill[]>();

      skills.forEach((skill) => {
        const normalized = typeof skill === 'string'
          ? { name: skill, category: 'Management' as SkillCategory }
          : skill;

        const bucket = grouped.get(normalized.category) || [];
        bucket.push(normalized);
        grouped.set(normalized.category, bucket);
      });

      return this.categoryOrder.flatMap((category) => grouped.get(category) || []);
    }

    const mapSkills = skills as ExperienceSkillMap;
    return this.categoryOrder.flatMap((category) =>
      (mapSkills[category] || []).map((name) => ({
        name,
        category
      }))
    );
  }

  skillClass(category: SkillCategory): string {
    switch (category) {
      case 'Management':
        return 'skill-tag-small skill-management';
      case 'Delivery':
        return 'skill-tag-small skill-delivery';
      case 'Tech':
        return 'skill-tag-small skill-tech';
      case 'Product & strategy':
        return 'skill-tag-small skill-product';
      default:
        return 'skill-tag-small';
    }
  }

  onToggleSection(): void {
    this.toggleSection.emit();
  }
}
