import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CvPageComponent } from './pages/cv-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TranslateModule, CvPageComponent],
  template: `
  <div class="container-full-width">
    <div class="container-content">
      <header class="appbar">
        <div class="tools">
          <!-- Language Toggle -->
          <div class="tool-group segmented-group">
            <button 
              class="segmented-button" 
              [class.active]="lang() === 'fr'"
              (click)="setLang('fr')"
              title="Français">
              <i class="fal fa-globe"></i>
               <strong>FR</strong>
            </button>
            <button 
              class="segmented-button" 
              [class.active]="lang() === 'en'"
              (click)="setLang('en')"
              title="English">
              <i class="fal fa-globe"></i>
               <strong>EN</strong>
            </button>
          </div>

          <!-- Variant Toggle -->
          <div class="tool-group segmented-group">
            <button 
              class="segmented-button" 
              [class.active]="variant() === 'full'"
              (click)="setVariant('full')"
              title="Version complète">
              <i class="fal fa-file-invoice"></i>
            </button>
            <button 
              class="segmented-button" 
              [class.active]="variant() === 'short'"
              (click)="setVariant('short')"
              title="Version courte">
              <i class="fal fa-file-alt"></i>
            </button>
          </div>

          <!-- Download Dropdown -->
          <div class="tool-group">
          <div class="dropdown-container">
              <button class="download-btn modern-dropdown" (click)="toggleDropdown()">
                <i class="fas fa-download"></i>
                <span>{{ 'ui.download_pdf' | translate }}</span>
                <i class="fas fa-chevron-down dropdown-arrow" [class.rotated]="showDropdown()"></i>
              </button>
            <div class="dropdown-menu modern-menu" [class.show]="showDropdown()">
              <button class="dropdown-item" (click)="downloadSpecific('long_fr')">
                <i class="fal fa-file-pdf"></i>
                <span>{{ 'download_options.long_fr' | translate }}</span>
              </button>
              <button class="dropdown-item" (click)="downloadSpecific('long_en')">
                <i class="fal fa-file-pdf"></i>
                <span>{{ 'download_options.long_en' | translate }}</span>
              </button>
              <button class="dropdown-item" (click)="downloadSpecific('short_bilingual')">
                <i class="fal fa-file-pdf"></i>
                <span>{{ 'download_options.short_bilingual' | translate }}</span>
              </button>
            </div>
          </div>
        </div>
        </div>
      </header>
    </div>

    <app-cv-page [lang]="lang()" [variant]="variant()"></app-cv-page>

    <div class="container-content">
      <footer class="small">
        © {{year}} Alec Roy
      </footer>
    </div>
  </div>
  `
})
export class AppComponent {
  year = new Date().getFullYear();
  private langSig = signal<'fr'|'en'>('fr');
  private variantSig = signal<'full'|'short'>('full');
  private dropdownSig = signal<boolean>(false);

  lang = computed(() => this.langSig());
  variant = computed(() => this.variantSig());
  showDropdown = computed(() => this.dropdownSig());

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

  toggleDropdown() {
    this.dropdownSig.set(!this.dropdownSig());
  }

  downloadSpecific(type: 'long_fr' | 'long_en' | 'short_bilingual') {
    this.dropdownSig.set(false); // Close dropdown
    let path = '';
    
    switch (type) {
      case 'long_fr':
        path = 'assets/pdfs/CV_AlecRoy_AgileLeader_DirectorsCut_FR.pdf';
        break;
      case 'long_en':
        path = 'assets/pdfs/CV_AlecRoy_AgileLeader_DirectorsCut_EN.pdf';
        break;
      case 'short_bilingual':
        path = 'assets/pdfs/CV_AlecRoy_AgileLeader_short.pdf';
        break;
    }
    
    this.downloadFile(path);
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
    this.downloadFile(path);
  }

  private downloadFile(path: string) {
    const a = document.createElement('a');
    a.href = path;
    a.download = path.split('/').pop() || 'alec-roy-cv.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}
