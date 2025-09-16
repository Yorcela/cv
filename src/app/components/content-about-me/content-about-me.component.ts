import { Component, Input, Output, EventEmitter, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CVVariant, VariantType } from '../../types/common.types';

@Component({
  selector: 'app-content-about-me',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './content-about-me.component.html',
})
export class ContentAboutMeComponent {
  @Input() variant: VariantType = CVVariant.FULL;
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
    const aboutText = this.variant === CVVariant.FULL ? this.about.long : this.about.short;
    return aboutText || '';
  }

  onToggleSection(): void {
    this.toggleSection.emit();
  }
}