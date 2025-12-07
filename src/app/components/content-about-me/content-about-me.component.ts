import { Component, ChangeDetectionStrategy, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CVVariant, VariantType } from '../../types/common.types';

@Component({
  selector: 'app-content-about-me',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './content-about-me.component.html',
})
export class ContentAboutMeComponent {
  readonly CVVariant = CVVariant;
  
  variant = input<VariantType>(CVVariant.FULL);
  data = input<any>(null);
  isExpanded = input<boolean>(true);
  toggleSection = output<void>();


  formattedAbout = computed(() => {
    const aboutData = this.data()?.['about-me'];
    if (!aboutData) {
      return '';
    }
    const aboutText = this.variant() === CVVariant.FULL ? aboutData.long : aboutData.short;
    return aboutText || '';
  });

  onToggleSection(): void {
    this.toggleSection.emit();
  }
}
