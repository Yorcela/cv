import { Component, ChangeDetectionStrategy, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-content-skills',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './content-skills.component.html',
  styleUrls: ['./content-skills.component.scss']
})
export class ContentSkillsComponent {
  data = input<any>(null);
  isExpanded = input<boolean>(true);
  toggleSection = output<void>();

  skillCategories = computed(() => this.data()?.skills || []);

  onToggleSection(): void {
    this.toggleSection.emit();
  }
}
