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
      <h1 class="name">{{ personalInfo?.name }}</h1>
      <h2 class="title">{{ personalInfo?.title }}</h2>
    </div>
  `,
  styleUrls: ['./whoami.component.css']
})
export class WhoamiComponent {
  personalInfo: any = {};

  constructor(private translate: TranslateService) {
    this.translate.get('personalInfo').subscribe((data: any) => {
      this.personalInfo = data || {};
    });
  }
}