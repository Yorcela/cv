import { Injectable, inject, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CVVariant, VariantType } from '../../types/common.types';

@Injectable({ providedIn: 'root' })
export class VariantStore {
  private platformId = inject(PLATFORM_ID);
  private key = 'app.variant';

  private _variant = signal<VariantType>(CVVariant.FULL);
  variant = this._variant.asReadonly();

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem(this.key) as VariantType | null;
      if (saved) this._variant.set(saved);
    }
  }
  set(v: VariantType) {
    this._variant.set(v);
    if (isPlatformBrowser(this.platformId)) localStorage.setItem(this.key, v);
  }
}