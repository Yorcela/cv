import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CVVariant, CVLanguage, VariantType, LanguageType } from '../../types/common.types';
import { AppbarComponentService } from './appbar.component.service';
import { I18nStore } from '../../core/stores/i18n.store';
import { VariantStore } from '../../core/stores/variant.store';

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

  private _dropdown = signal(false);
  showDropdown = this._dropdown.asReadonly();

  private readonly appbarService = inject(AppbarComponentService);
  private readonly i18nStore = inject(I18nStore);
  private readonly variantStore = inject(VariantStore);

  lang = this.i18nStore.lang;          // readonly signal
  variant = this.variantStore.variant; // readonly signal

  setLang(l: LanguageType) {
    this.i18nStore.set(l);
  }

  setVariant(v: VariantType) {
    this.variantStore.set(v);
  }

  toggleDropdown() {
    this._dropdown.update(v => !v);
  }

  downloadSpecific(type: 'long_fr' | 'long_en' | 'short_bilingual') {
    this._dropdown.set(false);
    this.appbarService.downloadSpecific(type);
  }

  downloadCurrent() {
    this.appbarService.downloadCurrent(this.lang(), this.variant());
  }
}
