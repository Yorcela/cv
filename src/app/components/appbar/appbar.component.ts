import { Component, computed, signal, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CVVariant, CVLanguage, VariantType, LanguageType } from '../../types/common.types';

@Component({
  selector: 'app-appbar',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './appbar.component.html',
  styleUrls: ['./appbar.component.scss', './appbar.component.mobile.scss']
})
export class AppbarComponent {
  private langSig = signal<LanguageType>(CVLanguage.FR);
  private variantSig = signal<VariantType>(CVVariant.FULL);
  private dropdownSig = signal<boolean>(false);


  CVLanguage = CVLanguage;
  CVVariant = CVVariant;

  lang = computed(() => this.langSig());
  variant = computed(() => this.variantSig());
  showDropdown = computed(() => this.dropdownSig());

  @Output() langChange = new EventEmitter<LanguageType>();
  @Output() variantChange = new EventEmitter<VariantType>();

  constructor(private translate: TranslateService) {}

  setLang(l: LanguageType) {
    this.langSig.set(l);
    this.translate.use(l);
    this.langChange.emit(l);
  }

  setVariant(v: VariantType) {
    this.variantSig.set(v);
    this.variantChange.emit(v);
  }

  toggleDropdown() {
    this.dropdownSig.set(!this.dropdownSig());
  }

  downloadSpecific(type: 'long_fr' | 'long_en' | 'short_bilingual') {
    this.dropdownSig.set(false);
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