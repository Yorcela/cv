import { Injectable, signal } from '@angular/core';

@Injectable()
export class UiShellStore {
  private _menuOpen = signal(false);
  menuOpen = this._menuOpen.asReadonly();
  toggleMenu() { this._menuOpen.update(v => !v); }
  openMenu() { this._menuOpen.set(true); }
  closeMenu() { this._menuOpen.set(false); }
}