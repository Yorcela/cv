import { Component, computed, signal, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-appbar',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './appbar.component.html',
  styleUrls: ['./appbar.component.scss', './appbar.component.mobile.scss']
})
export class AppbarComponent {
  private langSig = signal<'fr'|'en'>('fr');
  private variantSig = signal<'full'|'short'>('full');
  private dropdownSig = signal<boolean>(false);

  lang = computed(() => this.langSig());
  variant = computed(() => this.variantSig());
  showDropdown = computed(() => this.dropdownSig());

  @Output() langChange = new EventEmitter<'fr'|'en'>();
  @Output() variantChange = new EventEmitter<'full'|'short'>();

  constructor(private translate: TranslateService) {}

  setLang(l: string) {
    const val = (l === 'en' ? 'en' : 'fr');
    this.langSig.set(val);
    this.translate.use(val);
    this.langChange.emit(val);
  }

  setVariant(v: string) {
    const val = (v === 'short' ? 'short' : 'full');
    this.variantSig.set(val);
    this.variantChange.emit(val);
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