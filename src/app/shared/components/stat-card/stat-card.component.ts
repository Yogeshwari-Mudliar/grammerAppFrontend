import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.scss'],
  standalone: false,
})
export class StatCardComponent {
  @Input() icon = 'stats-chart-outline';
  @Input() value: string | number = 0;
  @Input() label = '';
  @Input() color = 'primary';
  @Input() suffix = '';
}
