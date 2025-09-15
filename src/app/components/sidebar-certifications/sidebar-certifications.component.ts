import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sidebar-certifications',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <div class="sidebar-block sidebar-certifications">
      <h3 class="sidebar-title"><i class="fad fa-certificate"></i> {{ 'i18n.ui.sections.certifications' | translate }}</h3>
      <div class="certifications-chips">
        <div class="certification-chip" *ngFor="let cert of certifications">
          <span class="chip-text">{{ cert.name }}</span>
          <span class="chip-badge">{{ cert.year }}</span>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./sidebar-certifications.component.css']
})
export class SidebarCertificationsComponent {
  certifications: any[] = [];

  constructor(private translate: TranslateService) {
    this.translate.get('cv.certifications').subscribe((data: any[]) => {
      this.certifications = data || [];
    });
  }
}