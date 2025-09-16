import { Component, Input, Output, EventEmitter, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-content-about-me',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './content-about-me.component.html',
})
export class ContentAboutMeComponent {
  @Input() variant: 'full' | 'short' = 'full';
  @Input() isExpanded: boolean = true;
  @Output() toggleSection = new EventEmitter<void>();
  about: any = {};

  constructor(private translate: TranslateService) {
    this.translate.get('cv').subscribe((data: any) => {
      this.about = data['about-me'];
    });
  }


  getFormattedAbout(): string {
    if (!this.about) return '';
    const aboutText = this.variant === 'full' ? this.about.long : this.about.short;
    return aboutText || '';
  }

  onToggleSection(): void {
    this.toggleSection.emit();
  }
}