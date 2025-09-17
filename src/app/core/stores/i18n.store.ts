import { Injectable, inject, signal, effect, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { CVLanguage, LanguageType } from '../../types/common.types';

@Injectable({ providedIn: 'root' })
export class I18nStore {
  private platformId = inject(PLATFORM_ID);
  private t = inject(TranslateService);
  private key = 'app.lang';

  private _lang = signal<LanguageType>(CVLanguage.FR);
  lang = this._lang.asReadonly();

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem(this.key) as LanguageType | null;
      if (saved) this._lang.set(saved);
    }
    effect(() => {
      const l = this._lang();
      this.t.use(l).subscribe(() => {
        // Force la recompilation des traductions
        this.t.reloadLang(l);
      });
      if (isPlatformBrowser(this.platformId)) localStorage.setItem(this.key, l);
    });
  }
  set(l: LanguageType) { 
    this._lang.set(l); 
  }
}