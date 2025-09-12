import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CvPageComponent } from './pages/cv-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TranslateModule, CvPageComponent],
  template: `
  <div class="container">
    <header class="appbar">
      <div class="brand">
        <div class="logo">AR</div>
        <div>
          <div style="font-weight:800; letter-spacing: .5px">Alec Roy</div>
          <div class="small">{{ 'tagline' | translate }}</div>
        </div>
      </div>
      <div class="tools">
        <select [value]="lang()" (change)="setLang(($any($event.target)).value)">
          <option value="fr">FR</option>
          <option value="en">EN</option>
        </select>

        <select [value]="variant()" (change)="setVariant(($any($event.target)).value)">
          <option value="full">{{ 'variant_full' | translate }}</option>
          <option value="short">{{ 'variant_short' | translate }}</option>
        </select>
        <button class="primary" (click)="downloadCurrent()">{{ 'download_pdf' | translate }}</button>
      </div>
    </header>

    <app-cv-page [lang]="lang()" [variant]="variant()"></app-cv-page>

    <footer class="small">
      © {{year}} Alec Roy
    </footer>
  </div>
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
  }

  setLang(l: string) {
    const val = (l === 'en' ? 'en' : 'fr');
    this.langSig.set(val);
    this.translate.use(val);
  }

  setVariant(v: string) {
    const val = (v === 'short' ? 'short' : 'full');
    this.variantSig.set(val);
  }

  downloadCurrent() {
    const l = this.lang();
    const v = this.variant();
    let path = '';
    if (v === 'short') {
      path = 'assets/pdfs/CV_AlecRoy_AgileLeader_short.pdf';
    } else {
      path = l === 'en'
        ? 'assets/pdfs/CV_AlecRoy_AgileLeader_DirectorsCut_EN.pdf'
        : 'assets/pdfs/CV_AlecRoy_AgileLeader_DirectorsCut_FR.pdf';
    }
    const a = document.createElement('a');
    a.href = path;
    a.download = path.split('/').pop() || 'alec-roy-cv.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}
