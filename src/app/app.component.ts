import { Component, computed, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TuiRootModule } from '@taiga-ui/core';
import { MainPageComponent } from './pages/main-page.component';
import { AppbarComponent } from './components/appbar/appbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TranslateModule, TuiRootModule, MainPageComponent, AppbarComponent],
  template: `
  <tui-root>
  <div class="container-full-width">
    <div class="container-content">
      <app-appbar 
        (langChange)="onLangChange($event)"
        (variantChange)="onVariantChange($event)"
      ></app-appbar>
    </div>

    <app-main-page [lang]="lang()" [variant]="variant()"></app-main-page>


  </div>
  </tui-root>
  `
})
export class AppComponent {
  year = new Date().getFullYear();
  private langSig = signal<'fr'|'en'>('fr');
  private variantSig = signal<'full'|'short'>('full');

  lang = computed(() => this.langSig());
  variant = computed(() => this.variantSig());

  constructor(private translate: TranslateService) {
    translate.addLangs(['en','fr']);
    translate.setDefaultLang('fr');
    translate.use('fr');
    
    // Ajouter une classe dynamique sur le body selon la variante
    effect(() => {
      const currentVariant = this.variant();
      document.body.classList.remove('cv-variant-full', 'cv-variant-short');
      document.body.classList.add(`cv-variant-${currentVariant}`);
    });
  }

  onLangChange(lang: 'fr' | 'en') {
    this.langSig.set(lang);
    this.translate.use(lang);
  }

  onVariantChange(variant: 'full' | 'short') {
    this.variantSig.set(variant);
  }
}
