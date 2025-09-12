import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SkillChipComponent } from '../components/skill-chip.component';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, TranslateModule, SkillChipComponent],
  template: `
    <div class="sidebar-skills">
      <h3 class="sidebar-title"><i class="fad fa-cogs"></i> {{ 'sections.skills' | translate }}</h3>
      <div class="skills-chips-container">
        <ng-container *ngFor="let category of getSkillCategories()">
          <app-skill-chip 
            *ngFor="let skill of skills?.[category]" 
            [label]="skill" 
            [type]="category">
          </app-skill-chip>
        </ng-container>
      </div>
    </div>
  `,
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent {
  skills: any = {};

  constructor(private translate: TranslateService) {
    this.translate.get('skills').subscribe((data: any) => {
      this.skills = data || {};
    });
  }

  getSkillCategories(): string[] {
    return ['agile', 'coaching', 'leadership', 'delivery', 'communication', 'tech', 'languages'];
  }
}