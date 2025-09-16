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
  template: `
    <div class="cv-sidebar" [class.sidebar-collapsed]="isMobile && isContactInfoCollapsed">
      <app-sidebar-whoami></app-sidebar-whoami>
      
      <!-- Titre pliable pour les informations de contact (mobile uniquement) -->
      <h2 class="sidebar-collapsible-title" *ngIf="isMobile" (click)="toggleContactInfo()">
        <i class="fas fa-address-card"></i>
        {{ 'i18n.ui.sections.informations' | translate }}
        <i class="fas" [class.fa-chevron-down]="!isContactInfoCollapsed" [class.fa-chevron-up]="isContactInfoCollapsed"></i>
      </h2>
      
      <div class="sidebar-collapsible-content" [class.collapsed]="isMobile && isContactInfoCollapsed">
        <app-sidebar-contact-info></app-sidebar-contact-info>
        <app-sidebar-personality></app-sidebar-personality>
        <app-sidebar-skills></app-sidebar-skills>
        <app-sidebar-education></app-sidebar-education>
        <app-sidebar-certifications></app-sidebar-certifications>
        <app-sidebar-hobbies></app-sidebar-hobbies>
      </div>
    </div>
  `,
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