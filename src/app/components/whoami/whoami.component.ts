import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-whoami',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <div class="profile-section">
      <div class="profile-photo-container">
        <img src="assets/images/profile-photo.png" [alt]="personalInfo?.name" class="profile-photo">
      </div>
      <div class="profile-info">
        <h1 class="name">{{ personalInfo?.name }}</h1>
        <div class="titles-container">
          <span class="title" *ngFor="let title of personalInfo?.titles">{{ title }}</span>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./whoami.component.css', './whoami.component.mobile.css']
})
export class WhoamiComponent {
  personalInfo: any = {};

  constructor(private translate: TranslateService) {
    this.translate.get('cv.personalInfo').subscribe((data: any) => {
      this.personalInfo = data || {};
    });
  }
}