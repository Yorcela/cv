import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-sidebar-education',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './sidebar-education.component.html',
  styleUrls: ['./sidebar-education.component.scss']
})
export class SidebarEducationComponent {
  education: any[] = [];

  constructor(private translate: TranslateService) {
    this.translate.get('cv.education').subscribe((data: any[]) => {
      this.education = data || [];
    });
  }
}