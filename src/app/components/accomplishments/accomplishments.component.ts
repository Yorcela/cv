import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
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
      <h2 class="main-section-title clickable-title" (click)="onToggleSection()">
        <i class="fad fa-trophy"></i>
        {{ 'i18n.ui.sections.accomplishments' | translate }}
        <i class="fad" [class.fa-chevron-down]="isExpanded" [class.fa-chevron-right]="!isExpanded"></i>
      </h2>
      <div *ngIf="isExpanded">
        <div class="accomplishments-container">
          <ol class="accomplishments-list">
            <ng-container *ngFor="let accomplishment of accomplishments; let companyIndex = index">
              <li *ngIf="variant === 'full'" class="accomplishment-company-header">
                <div class="accomplishment-header-content">
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
              </li>
              <li *ngFor="let detail of accomplishment.details; let detailIndex = index" 
                  class="accomplishment-item-unified" 
                  [innerHTML]="formatDetailForVariant(detail)">
              </li>
            </ng-container>
          </ol>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./accomplishments.component.css']
})
export class AccomplishmentsComponent implements OnInit {
  @Input() variant: 'full' | 'short' = 'full';
  @Input() data: any = null;
  @Input() isExpanded: boolean = true;
  @Output() toggleSection = new EventEmitter<void>();
  accomplishments: Accomplishment[] = [];

  constructor(private translate: TranslateService) {
    this.translate.get('cv.accomplishments').subscribe((data: any) => {
      this.accomplishments = data || [];
    });
  }

  ngOnInit(): void {
    // Set default expanded state based on variant
    if (!this.isExpanded) {
      this.isExpanded = this.variant === 'full';
    }
  }

  formatDetail(detail: string): string {
    // Use markdown pipe for formatting
    const markdownPipe = new MarkdownPipe();
    return markdownPipe.transform(detail);
  }

  getAllAccomplishmentDetails(): string[] {
    const allDetails: string[] = [];
    this.accomplishments.forEach(accomplishment => {
      accomplishment.details.forEach(detail => {
        allDetails.push(detail);
      });
    });
    return allDetails;
  }

  formatDetailForVariant(detail: string): string {
    let formattedDetail = detail;
    
    // For short variant, remove everything after "Résultat:"
    if (this.variant === 'short') {
      const resultIndex = detail.indexOf('<br/><u>Résultat:</u>');
      if (resultIndex !== -1) {
        formattedDetail = detail.substring(0, resultIndex);
      }
    }
    
    // Use markdown pipe for formatting
    const markdownPipe = new MarkdownPipe();
    return markdownPipe.transform(formattedDetail);
  }


  onImageError(event: any): void {
    event.target.style.display = 'none';
  }

  onToggleSection(): void {
    this.toggleSection.emit();
  }
}