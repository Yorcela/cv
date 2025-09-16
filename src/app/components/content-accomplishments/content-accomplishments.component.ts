import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MarkdownPipe } from '../../pipes/markdown.pipe';
import { CVVariant, VariantType } from '../../types/common.types';
import { AccomplishmentDetailed } from './content-accomplishments.component.interface';

@Component({
  selector: 'app-content-accomplishments',
  standalone: true,
  imports: [CommonModule, TranslateModule, MarkdownPipe],
  templateUrl: './content-accomplishments.component.html',
  styleUrls: ['./content-accomplishments.component.scss']
})
export class ContentAccomplishmentsComponent {
  @Input() variant: VariantType = CVVariant.FULL;
  @Input() data: any = null;
  @Input() isExpanded: boolean = true;
  @Output() toggleSection = new EventEmitter<void>();


  CVVariant = CVVariant;
  accomplishments: AccomplishmentDetailed[] = [];

  constructor(private translate: TranslateService) {
    this.translate.get('cv.accomplishments').subscribe((data: any) => {
      this.accomplishments = data || [];
    });
  }

  ngOnInit(): void {
    // Set default expanded state based on variant
    if (!this.isExpanded) {
      this.isExpanded = this.variant === CVVariant.FULL;
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

    // For short variant, remove everything after "Résultat:" or "Result:"
    if (this.variant === CVVariant.SHORT) {
      const resultIndexFr = detail.indexOf('<br/><u>Résultat:</u>');
      const resultIndexEn = detail.indexOf('<br/><u>Result:</u>');
      const resultIndex = resultIndexFr !== -1 ? resultIndexFr : resultIndexEn;
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