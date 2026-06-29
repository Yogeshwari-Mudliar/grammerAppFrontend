import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
  standalone: false,
})
export class ProgressBarComponent {
  @Input() label = '';
  @Input() value = 0;
  @Input() color = 'primary';

  get fraction(): number {
    return Math.max(0, Math.min(100, this.value)) / 100;
  }
}
