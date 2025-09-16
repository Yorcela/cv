import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sidebar-hobbies',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './sidebar-hobbies.component.html',
  styleUrls: ['./sidebar-hobbies.component.scss']
})
export class SidebarHobbiesComponent {
  hobbies: { name: string; icon: string }[] = [];

  constructor(private translate: TranslateService) {
    this.translate.get('cv.hobbies').subscribe((data: { name: string; icon: string }[]) => {
      this.hobbies = data || [];
    });
  }
}