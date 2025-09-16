import { Component, ChangeDetectionStrategy, inject, model, output, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CVVariant, CVLanguage, VariantType, LanguageType } from '../../types/common.types';
import { I18nStore } from '../../core/stores/i18n.store';
import { CvDownloadService } from '../../core/services/cv-download.service';

@Component({
  selector: 'app-appbar',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './appbar.component.html',
  styleUrls: ['./appbar.component.scss', './appbar.component.mobile.scss']
})
export class AppbarComponent {
  readonly CVLanguage = CVLanguage;
  readonly CVVariant = CVVariant;

  lang = model<LanguageType>(CVLanguage.FR);       // parent can [(lang)]
  variant = model<VariantType>(CVVariant.FULL);    // parent can [(variant)]

  // Local UI state
  private _dropdown = signal(false);
  showDropdown = this._dropdown.asReadonly();

  // Legacy outputs (if you need explicit events in addition to [(...)]):  
  langChange = output<LanguageType>();
  variantChange = output<VariantType>();

  private readonly i18nStore = inject(I18nStore);
  private readonly downloadService = inject(CvDownloadService);

  constructor() {
    // Synchronize component lang with store
    effect(() => {
      const storeLang = this.i18nStore.lang();
      if (this.lang() !== storeLang) {
        this.lang.set(storeLang);
      }
    }, { allowSignalWrites: true });

    // Update store when component lang changes
    effect(() => {
      const componentLang = this.lang();
      this.i18nStore.set(componentLang);
      this.langChange.emit(componentLang);
    });

    effect(() => {
      this.variantChange.emit(this.variant());
    });
  }

  setLang(l: LanguageType) {
    this.lang.set(l); // effect will handle store sync + emit
  }

  setVariant(v: VariantType) {
    this.variant.set(v); // effect will emit
  }

  toggleDropdown() {
    this._dropdown.update(v => !v);
  }

  downloadSpecific(type: 'long_fr' | 'long_en' | 'short_bilingual') {
    this._dropdown.set(false);
    this.downloadService.downloadSpecific(type);
  }

  downloadCurrent() {
    this._dropdown.set(false);
    this.downloadService.downloadCurrent(this.lang(), this.variant());
  }
}
