import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <div class="sidebar-skills">
      <h3 class="sidebar-title"><i class="fad fa-cogs"></i> {{ 'i18n.ui.sections.skills' | translate }}</h3>
      <div class="skills-chips-container">
        <div class="skill-category" *ngFor="let skillCategory of getSkillCategories()">
          <div class="category-header">
            <span class="icon-chip" [attr.data-tooltip]="getCategoryTitle(skillCategory)">
              <i class="fad {{ skillCategory.icon }}"></i>
            </span>
          </div>
          <div class="skills-list" *ngIf="skillCategory.skills?.length > 0">
            <span class="skill-item">
              {{ skillCategory.skills.join(', ') }}
            </span>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent {
  skills: any[] = [];

  constructor(private translate: TranslateService) {
    this.translate.get('cv.skills').subscribe((data: any) => {
      this.skills = data || [];
    });
  }

  getSkillCategories(): any[] {
    return this.skills;
  }

  getCategoryTitle(skillCategory: any): string {
    return skillCategory.name;
  }
}