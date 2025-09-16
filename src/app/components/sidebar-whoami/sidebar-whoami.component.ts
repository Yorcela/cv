import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PersonalInfo } from '../sidebar-contact-info/sidebar-contact-info.component.interface';

@Component({
  selector: 'app-sidebar-whoami',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './sidebar-whoami.component.html',
  styleUrls: ['./sidebar-whoami.component.scss']
})
export class SidebarWhoamiComponent {
  personalInfo: PersonalInfo = {} as PersonalInfo;

  constructor(private translate: TranslateService) {
    this.translate.get('cv.personalInfo').subscribe((data: any) => {
      this.personalInfo = data || {};
    });
  }
}