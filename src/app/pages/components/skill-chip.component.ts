import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skill-chip',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="skill-chip" [ngClass]="getChipClass()">
      {{ label }}
    </span>
  `,
  styles: [`
    .skill-chip {
      display: inline-block;
      padding: 2px 6px;
      margin: 1px;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 500;
      color: white;
      text-shadow: 0 1px 2px rgba(0,0,0,0.1);
      transition: all 0.3s ease;
      cursor: default;
    }

    .skill-chip:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }

    .skill-chip.agile {
      background: #E3F2FD;
      color: #0D47A1;
    }

    .skill-chip.agile:hover {
      background: #BBDEFB;
      transform: translateY(-1px);
    }

    .skill-chip.coaching {
      background: #FFF3E0;
      color: #E65100;
    }

    .skill-chip.coaching:hover {
      background: #FFCC80;
      transform: translateY(-1px);
    }

    .skill-chip.leadership {
      background: #FCE4EC;
      color: #880E4F;
    }

    .skill-chip.leadership:hover {
      background: #F8BBD9;
      transform: translateY(-1px);
    }

    .skill-chip.delivery {
      background: #FFFDE7;
      color: #E65100;
    }

    .skill-chip.delivery:hover {
      background: #FFF59D;
      transform: translateY(-1px);
    }

    .skill-chip.communication {
      background: #F3E5F5;
      color: #4A148C;
    }

    .skill-chip.communication:hover {
      background: #E1BEE7;
      transform: translateY(-1px);
    }

    .skill-chip.tech {
      background: #E8F5E8;
      color: #1B5E20;
    }

    .skill-chip.tech:hover {
      background: #C8E6C9;
      transform: translateY(-1px);
    }

    .skill-chip.languages {
      background: #F5F5F5;
      color: #212121;
    }

    .skill-chip.languages:hover {
      background: #E0E0E0;
      transform: translateY(-1px);
    }
  `]
})
export class SkillChipComponent {
  @Input() label: string = '';
  @Input() type: 'agile' | 'coaching' | 'leadership' | 'delivery' | 'communication' | 'tech' | 'languages' = 'agile';

  getChipClass(): string {
    return this.type;
  }
}