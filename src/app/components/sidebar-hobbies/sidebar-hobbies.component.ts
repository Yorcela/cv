import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sidebar-hobbies',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <div class="sidebar-block sidebar-hobbies">
      <h3 class="sidebar-title"><i class="fad fa-heart"></i> {{ 'i18n.ui.sections.hobbies' | translate }}</h3>
      <div class="hobbies-list">
        <div class="hobby-item" *ngFor="let hobby of hobbies">
          <i class="fad" [ngClass]="hobby.icon"></i>
          {{ hobby.name }}
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./sidebar-hobbies.component.css']
})
export class SidebarHobbiesComponent {
  hobbies: { name: string; icon: string }[] = [];

  constructor(private translate: TranslateService) {
    this.translate.get('cv.hobbies').subscribe((data: { name: string; icon: string }[]) => {
      this.hobbies = data || [];
    });
  }
}