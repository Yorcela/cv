import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sidebar-education',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <div class="sidebar-block sidebar-education">
      <h3 class="sidebar-title"><i class="fad fa-university"></i> {{ 'i18n.ui.sections.education' | translate }}</h3>
      <div class="education-content">
        <div class="education-item" *ngFor="let edu of education">
          <div class="education-main">
            <div class="education-degree">{{ edu.degree }}</div>
            <div class="education-school">{{ edu.school }}</div>
          </div>
          <span class="education-year">{{ edu.year }}</span>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./sidebar-education.component.scss']
})
export class SidebarEducationComponent {
  education: any[] = [];

  constructor(private translate: TranslateService) {
    this.translate.get('cv.education').subscribe((data: any[]) => {
      this.education = data || [];
    });
  }
}