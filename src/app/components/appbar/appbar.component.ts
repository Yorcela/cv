import { Component, ChangeDetectionStrategy, inject, model, output, signal, effect } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CVVariant, CVLanguage, VariantType, LanguageType } from '../../types/common.types';

const PDF_PATHS = {
  long_fr: 'assets/pdfs/CV_AlecRoy_AgileLeader_DirectorsCut_FR.pdf',
  long_en: 'assets/pdfs/CV_AlecRoy_AgileLeader_DirectorsCut_EN.pdf',
  short_bilingual: 'assets/pdfs/CV_AlecRoy_AgileLeader_short.pdf'
} as const;

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
  private readonly document = inject(DOCUMENT);

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

  downloadSpecific(type: keyof typeof PDF_PATHS) {
    this._dropdown.set(false);
    this.downloadFile(PDF_PATHS[type]);
  }

  downloadCurrent() {
    const l = this.lang();
    const v = this.variant();
    const path =
      v === CVVariant.SHORT
        ? PDF_PATHS.short_bilingual
        : l === CVLanguage.EN
          ? PDF_PATHS.long_en
          : PDF_PATHS.long_fr;

    this.downloadFile(path);
  }

  private downloadFile(path: string) {
    // SSR-safe anchor creation via injected DOCUMENT
    const a = this.document.createElement('a');
    a.href = path;
    a.download = path.split('/').pop() || 'alec-roy-cv.pdf';
    this.document.body.appendChild(a);
    a.click();
    this.document.body.removeChild(a);
  }
}
