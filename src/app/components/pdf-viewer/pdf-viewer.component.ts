import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-pdf-viewer',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewerComponent {
  @Input() isVisible: boolean = false;
  @Input() pdfSrc: string = '';
  @Input() title: string = '';
  @Output() closeViewer = new EventEmitter<void>();

  constructor(private sanitizer: DomSanitizer) {}

  get sanitizedPdfUrl(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfSrc);
  }

  close() {
    this.closeViewer.emit();
  }

  onOverlayClick(event: Event) {
    this.close();
  }
}