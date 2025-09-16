import { Component, ChangeDetectionStrategy, inject, input, output, signal, effect, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
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
  isExpanded = input<boolean>(true);
  toggleSection = output<void>();
  
  private _about = signal<any>({});
  about = this._about.asReadonly();
  
  private readonly translate = inject(TranslateService);

  constructor() {
    effect(() => {
      this.translate.get('cv').subscribe((data: any) => {
        this._about.set(data['about-me'] || {});
      });
    }, { allowSignalWrites: true });
  }


  formattedAbout = computed(() => {
    const aboutData = this.about();
    if (!aboutData) return '';
    const aboutText = this.variant() === CVVariant.FULL ? aboutData.long : aboutData.short;
    return aboutText || '';
  });

  onToggleSection(): void {
    this.toggleSection.emit();
  }
}