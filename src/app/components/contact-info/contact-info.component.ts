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
        <a [href]="'mailto:' + personalInfo?.email">{{ personalInfo?.email }}</a>
      </div>
      <div class="contact-item">
        <i class="fad fa-map-marker-alt"></i>
        <span>{{ personalInfo?.location }}</span>
      </div>
      <div class="contact-item">
        <i class="fab fa-linkedin"></i>
        <a [href]="personalInfo?.linkedin" target="_blank">{{ 'sections.linkedin' | translate }}</a>
      </div>
    </div>
  `,
  styleUrls: ['./contact-info.component.css']
})
export class ContactInfoComponent {
  personalInfo: any = {};

  constructor(private translate: TranslateService) {
    this.translate.get('personalInfo').subscribe((data: any) => {
      this.personalInfo = data || {};
    });
  }
}