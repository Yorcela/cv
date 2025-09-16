import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PersonalInfo } from './sidebar-contact-info.component.interface';

@Component({
  selector: 'app-sidebar-contact-info',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './sidebar-contact-info.component.html',
  styleUrls: ['./sidebar-contact-info.component.scss']
})
export class SidebarContactInfoComponent {
  personalInfo: PersonalInfo = {} as PersonalInfo;
  currentLang: string = 'fr';

  private readonly translate = inject(TranslateService);

  constructor() {
    this.translate.get('cv.personalInfo').subscribe((data: any) => {
      this.personalInfo = data || {};
    });

    this.currentLang = this.translate.currentLang || 'fr';
    this.translate.onLangChange.subscribe((event) => {
      this.currentLang = event.lang;
    });
  }
}