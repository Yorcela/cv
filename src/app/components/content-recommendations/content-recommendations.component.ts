import { Component, ChangeDetectionStrategy, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MarkdownPipe } from '../../pipes/markdown.pipe';
import { CVVariant, VariantType } from '../../types/common.types';
import { RecommendationDetailed } from './content-recommendations.component.interface';

@Component({
  selector: 'app-content-recommendations',
  standalone: true,
  imports: [CommonModule, TranslateModule, MarkdownPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './content-recommendations.component.html',
  styleUrls: ['./content-recommendations.component.scss']
})
export class ContentRecommendationsComponent {
  readonly CVVariant = CVVariant;
  
  variant = input<VariantType>(CVVariant.FULL);
  data = input<any>(null);
  isExpanded = input<boolean>(true);
  toggleSection = output<void>();

  recommendations = computed<RecommendationDetailed[]>(() => this.data()?.recommandations || []);

  formatTestimonial(testimonial: string): string {
    const markdownPipe = new MarkdownPipe();
    return markdownPipe.transform(testimonial);
  }

  onToggleSection(): void {
    this.toggleSection.emit();
  }

  getRecommendations(): RecommendationDetailed[] {
    return this.recommendations();
  }
}
