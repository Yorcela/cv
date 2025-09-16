import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SkillCategory } from './sidebar-skills.component.interface';

@Component({
  selector: 'app-sidebar-skills',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './sidebar-skills.component.html',
  styleUrls: ['./sidebar-skills.component.scss']
})
export class SidebarSkillsComponent {
  skills: SkillCategory[] = [];

  constructor(private translate: TranslateService) {
    this.translate.get('cv.skills').subscribe((data: any) => {
      this.skills = data || [];
    });
  }

  getSkillCategories(): SkillCategory[] {
    return this.skills;
  }

  getCategoryTitle(skillCategory: SkillCategory): string {
    return skillCategory.title;
  }
}