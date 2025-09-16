import { Component, OnInit, HostListener } from '@angular/core';
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
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isMobile: boolean = false;
  isContactInfoCollapsed: boolean = false;

  ngOnInit() {
    this.checkIfMobile();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkIfMobile();
  }

  private checkIfMobile() {
    this.isMobile = window.innerWidth <= 768;
  }

  toggleContactInfo() {
    this.isContactInfoCollapsed = !this.isContactInfoCollapsed;
  }
}