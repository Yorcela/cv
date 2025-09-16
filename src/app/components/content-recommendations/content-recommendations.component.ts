import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MarkdownPipe } from '../../pipes/markdown.pipe';
import { CVVariant, VariantType } from '../../types/common.types';
import { RecommendationDetailed } from './content-recommendations.component.interface';

@Component({
  selector: 'app-content-recommendations',
  standalone: true,
  imports: [CommonModule, TranslateModule, MarkdownPipe],
  templateUrl: './content-recommendations.component.html',
  styleUrls: ['./content-recommendations.component.scss']
})
export class ContentRecommendationsComponent {
  @Input() variant: VariantType = CVVariant.FULL;
  @Input() data: any = null;
  @Input() isExpanded: boolean = true;
  @Output() toggleSection = new EventEmitter<void>();
  recommendations: RecommendationDetailed[] = [];

  constructor(private translate: TranslateService) {
    this.translate.get('cv.recommandations').subscribe((data: RecommendationDetailed[]) => {
      this.recommendations = data || [];
    });
  }

  formatTestimonial(testimonial: string): string {
    const markdownPipe = new MarkdownPipe();
    return markdownPipe.transform(testimonial);
  }

  onToggleSection(): void {
    this.toggleSection.emit();
  }

  getRecommendations(): RecommendationDetailed[] {
    return this.recommendations;
  }
}