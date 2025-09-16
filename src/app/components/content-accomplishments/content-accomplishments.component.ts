import { Component, ChangeDetectionStrategy, inject, input, output, signal, effect, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
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
  
  private _accomplishments = signal<AccomplishmentDetailed[]>([]);
  accomplishments = this._accomplishments.asReadonly();
  
  private readonly translate = inject(TranslateService);
  private readonly accomplishmentsService = inject(ContentAccomplishmentsService);

  constructor() {
    effect(() => {
      this.translate.get('cv.accomplishments').subscribe((data: any) => {
        this._accomplishments.set(data || []);
      });
    }, { allowSignalWrites: true });
  }

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