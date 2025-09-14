import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-contact-info',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <div class="contact-section">
      <div class="contact-item">
        <i class="fad fa-phone"></i>
        <span>{{ personalInfo?.phone }}</span>
      </div>
      <div class="contact-item">
        <i class="fad fa-envelope"></i>
        <a [href]="'mailto:' + personalInfo?.email">{{personalInfo?.email }}</a>
      </div>
      <div class="contact-item">
        <i class="fad fa-map-marker-alt"></i>
        <span>{{ personalInfo?.location }}</span>
      </div>
      <div class="contact-item">
        <i class="fab fa-linkedin"></i>
        <a [href]="personalInfo?.linkedin" target="_blank">{{ 'i18n.ui.linkedin' | translate }}</a>
      </div>
      <div class="contact-item">
        <i class="fab fa-youtube"></i>
        <a [href]="personalInfo?.youtube" target="_blank">{{ 'i18n.ui.youtube' | translate }}</a>
      </div>
      <div class="contact-item">
        <i class="fad fa-unicorn"></i>
        <a [href]="personalInfo?.assessfirst" target="_blank">{{ 'i18n.ui.assessfirst' | translate }}</a>
      </div>
    </div>
  `,
  styleUrls: ['./contact-info.component.css']
})
export class ContactInfoComponent {
  personalInfo: any = {};
  ui: any = {};

  constructor(private translate: TranslateService) {
    this.translate.get('cv.personalInfo').subscribe((data: any) => {
      this.personalInfo = data || {};
    });
  }
}