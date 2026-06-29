import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { StatCardComponent } from './components/stat-card/stat-card.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [StatCardComponent, ProgressBarComponent],
  exports: [StatCardComponent, ProgressBarComponent],
})
export class SharedModule {}
