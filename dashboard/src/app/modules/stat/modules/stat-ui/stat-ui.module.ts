import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartjsModule } from '@ctrl/ngx-chartjs';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '~/shared/shared.module';
import { MaterialModule } from '~/shared/material/material.module';

import { StatNumberComponent } from './components/stat-number/stat-number.component';
import { StatGraphComponent } from './components/stat-graph/stat-graph.component';
import { StatViewComponent } from './components/stat-view/stat-view.component';

@NgModule({
  declarations: [StatNumberComponent, StatGraphComponent, StatViewComponent],
  imports: [CommonModule, ChartjsModule, FormsModule, MaterialModule, SharedModule],
  exports: [StatGraphComponent, StatViewComponent],
})
export class StatUIModule {}