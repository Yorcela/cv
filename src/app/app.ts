import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TuiRootModule } from '@taiga-ui/core';
import { MainPageComponent } from './pages/main.page.component';
import { AppbarComponent } from './components/appbar/appbar.component';
import { CVVariant, CVLanguage, VariantType, LanguageType } from './types/common.types';
import { VariantStore } from './core/stores/variant.store';
import { I18nStore } from './core/stores/i18n.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TranslateModule, TuiRootModule, MainPageComponent, AppbarComponent],
  templateUrl: './app.html'
})
export class AppComponent {
  year = new Date().getFullYear();
  
  private translate = inject(TranslateService);
  private variantStore = inject(VariantStore);
  private i18nStore = inject(I18nStore); // Force l'initialisation du store

  constructor() {
    this.translate.addLangs(['en','fr']);
    this.translate.setDefaultLang('fr');
    
    effect(() => {
      const currentVariant = this.variantStore.variant();
      document.body.classList.remove('cv-variant-full', 'cv-variant-short');
      document.body.classList.add(`cv-variant-${currentVariant}`);
    });
  }
}
