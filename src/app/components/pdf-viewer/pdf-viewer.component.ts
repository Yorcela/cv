import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-pdf-viewer',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <div class="pdf-viewer-overlay" *ngIf="isVisible" (click)="onOverlayClick($event)">
      <div class="pdf-viewer-container" (click)="$event.stopPropagation()">
        <div class="pdf-viewer-header">
          <h3 class="pdf-viewer-title">{{ title }}</h3>
          <button class="pdf-viewer-close" type="button" (click)="close()">
            <i class="fal fa-times"></i>
          </button>
        </div>
        <div class="pdf-viewer-content">
          <iframe
            [src]="sanitizedPdfUrl"
            class="pdf-iframe"
            frameborder="0">
          </iframe>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./pdf-viewer.component.css']
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