import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SidebarWhoamiComponent } from '../sidebar-whoami/sidebar-whoami.component';
import { SidebarContactInfoComponent } from '../sidebar-contact-info/sidebar-contact-info.component';
import { SidebarPersonalityComponent } from '../sidebar-personality/sidebar-personality.component';
import { SidebarSkillsComponent } from '../sidebar-skills/sidebar-skills.component';
import { SidebarEducationComponent } from '../sidebar-education/sidebar-education.component';
import { SidebarCertificationsComponent } from '../sidebar-certifications/sidebar-certifications.component';
import { SidebarHobbiesComponent } from '../sidebar-hobbies/sidebar-hobbies.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    SidebarWhoamiComponent,
    SidebarContactInfoComponent,
    SidebarPersonalityComponent,
    SidebarSkillsComponent,
    SidebarEducationComponent,
    SidebarCertificationsComponent,
    SidebarHobbiesComponent
  ],
  template: `
    <div class="cv-sidebar">
      <app-sidebar-whoami></app-sidebar-whoami>
      <app-sidebar-contact-info></app-sidebar-contact-info>
      <app-sidebar-personality></app-sidebar-personality>
      <app-sidebar-skills></app-sidebar-skills>
      <app-sidebar-education></app-sidebar-education>
      <app-sidebar-certifications></app-sidebar-certifications>
      <app-sidebar-hobbies></app-sidebar-hobbies>
    </div>
  `,
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
}