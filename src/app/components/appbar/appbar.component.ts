import { Component, ChangeDetectionStrategy, inject, model, output, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CVVariant, CVLanguage, VariantType, LanguageType } from '../../types/common.types';
import { AppbarComponentService } from './appbar.component.service';

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

  private readonly translate = inject(TranslateService);
  private readonly appbarService = inject(AppbarComponentService);

  constructor() {
    // keep ngx-translate in sync with current lang
    effect(() => {
      const l = this.lang();
      this.translate.use(l);
      this.langChange.emit(l); // optional: only if you still want the event
    });

    effect(() => {
      this.variantChange.emit(this.variant());
    });
  }

  setLang(l: LanguageType) {
    this.lang.set(l); // effect will handle translate + emit
  }

  setVariant(v: VariantType) {
    this.variant.set(v); // effect will emit
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
