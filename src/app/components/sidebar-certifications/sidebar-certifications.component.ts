import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sidebar-certifications',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './sidebar-certifications.component.html',
  styleUrls: ['./sidebar-certifications.component.scss']
})
export class SidebarCertificationsComponent {
  certifications: any[] = [];

  constructor(private translate: TranslateService) {
    this.translate.get('cv.certifications').subscribe((data: any[]) => {
      this.certifications = data || [];
    });
  }
}