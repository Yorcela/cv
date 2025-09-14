import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MarkdownPipe } from '../../pipes/markdown.pipe';

interface Accomplishment {
  company: string;
  position: string;
  details: string[];
}

@Component({
  selector: 'app-accomplishments',
  standalone: true,
  imports: [CommonModule, TranslateModule, MarkdownPipe],
  template: `
    <section class="main-section">
      <h2 class="main-section-title clickable-title" (click)="toggleAccomplishmentsSection()">
        <i class="fad fa-trophy"></i>
        {{ 'i18n.ui.sections.accomplishments' | translate }}
        <i class="fad" [class.fa-chevron-down]="accomplishmentsSectionExpanded" [class.fa-chevron-right]="!accomplishmentsSectionExpanded"></i>
      </h2>
      <div *ngIf="accomplishmentsSectionExpanded">
        <div class="accomplishments-container">
          <div *ngFor="let accomplishment of accomplishments" class="accomplishment-item">
            <div class="accomplishment-header">
            <div class="accomplishment-company-info">
              <img 
                [src]="accomplishment.logo" 
                [alt]="accomplishment.company + ' logo'"
                class="company-logo"
                (error)="onImageError($event)"
              />
              <h3 class="accomplishment-company">{{ accomplishment.company }}</h3>
            </div>
            <span class="accomplishment-position">{{ accomplishment.position }}</span>
          </div>
            <ul class="accomplishment-details">
              <li *ngFor="let detail of accomplishment.details" [innerHTML]="formatDetail(detail)"></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./accomplishments.component.css']
})
export class AccomplishmentsComponent implements OnInit {
  @Input() variant: 'full' | 'short' = 'full';
  accomplishments: Accomplishment[] = [];
  accomplishmentsSectionExpanded = true;

  constructor(private translate: TranslateService) {
    this.translate.get('cv.accomplishments').subscribe((data: any) => {
      this.accomplishments = data || [];
    });
  }

  ngOnInit(): void {
    // Set default expanded state based on variant
    this.accomplishmentsSectionExpanded = this.variant === 'full';
  }

  formatDetail(detail: string): string {
    // Use markdown pipe for formatting
    const markdownPipe = new MarkdownPipe();
    return markdownPipe.transform(detail);
  }


  onImageError(event: any): void {
    event.target.style.display = 'none';
  }

  toggleAccomplishmentsSection(): void {
    this.accomplishmentsSectionExpanded = !this.accomplishmentsSectionExpanded;
  }
}