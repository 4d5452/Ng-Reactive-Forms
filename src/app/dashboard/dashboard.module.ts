import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  imports: [ 
    CommonModule,
    MaterialModule,
    DashboardRoutingModule
 ],
  exports: [],
  declarations: [ 
    DashboardComponent
 ],
  providers: []
})
export class DashboardModule {}