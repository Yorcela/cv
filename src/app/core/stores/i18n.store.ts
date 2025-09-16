import { Injectable, signal, effect } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CVLanguage, LanguageType } from '../../types/common.types';

@Injectable({ providedIn: 'root' })
export class I18nStore {
  private _lang = signal<LanguageType>(CVLanguage.FR);
  lang = this._lang.asReadonly();

  constructor(private translate: TranslateService) {
    effect(() => {
      this.translate.use(this._lang());
    }, { allowSignalWrites: true });
  }

  set(lang: LanguageType): void {
    this._lang.set(lang);
  }
}