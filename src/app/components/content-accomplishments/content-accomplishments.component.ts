import { Component, ChangeDetectionStrategy, input, output, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MarkdownPipe } from '../../pipes/markdown.pipe';
import { CVVariant, VariantType } from '../../types/common.types';
import { AccomplishmentDetailed } from './content-accomplishments.component.interface';
import { ContentAccomplishmentsService } from './content-accomplishments.service';

@Component({
  selector: 'app-content-accomplishments',
  standalone: true,
  imports: [CommonModule, TranslateModule, MarkdownPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './content-accomplishments.component.html',
  styleUrls: ['./content-accomplishments.component.scss']
})
export class ContentAccomplishmentsComponent {
  readonly CVVariant = CVVariant;
  
  variant = input<VariantType>(CVVariant.FULL);
  data = input<any>(null);
  isExpanded = input<boolean>(true);
  toggleSection = output<void>();

  private readonly accomplishmentsService = inject(ContentAccomplishmentsService);

  accomplishments = computed<AccomplishmentDetailed[]>(() => this.data()?.accomplishments || []);

  formatDetail(detail: string): string {
    return this.accomplishmentsService.formatDetail(detail);
  }

  allAccomplishmentDetails = computed(() => {
    return this.accomplishmentsService.extractAllDetails(this.accomplishments());
  });

  formatDetailForVariant(detail: string): string {
    return this.accomplishmentsService.formatDetailForVariant(detail, this.variant());
  }

  onImageError(event: any): void {
    event.target.style.display = 'none';
  }

  onToggleSection(): void {
    this.toggleSection.emit();
  }
}
