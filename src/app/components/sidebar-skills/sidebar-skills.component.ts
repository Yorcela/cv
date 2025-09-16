import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sidebar-skills',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './sidebar-skills.component.html',
  styleUrls: ['./sidebar-skills.component.scss']
})
export class SidebarSkillsComponent {
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