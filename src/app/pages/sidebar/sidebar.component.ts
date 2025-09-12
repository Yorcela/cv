import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { WhoamiComponent } from './whoami.component';
import { ContactInfoComponent } from './contact-info.component';
import { SkillsComponent } from './skills.component';
import { EducationComponent } from './education.component';
import { CertificationsComponent } from './certifications.component';
import { HobbiesComponent } from './hobbies.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    WhoamiComponent,
    ContactInfoComponent,
    SkillsComponent,
    EducationComponent,
    CertificationsComponent,
    HobbiesComponent
  ],
  template: `
    <div class="cv-sidebar">
      <app-whoami></app-whoami>
      <app-contact-info></app-contact-info>
      <app-skills></app-skills>
      <app-education></app-education>
      <app-certifications></app-certifications>
      <app-hobbies></app-hobbies>
    </div>
  `,
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
}