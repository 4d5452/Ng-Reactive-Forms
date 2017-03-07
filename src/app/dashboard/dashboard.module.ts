import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';

import { SharedModule } from '../shared/shared.module';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { DataViewModule } from '../data-view/data-view.module';

@NgModule({
  imports: [ 
    SharedModule,
    DataViewModule,
    DashboardRoutingModule
 ],
  exports: [],
  declarations: [ 
    DashboardComponent
 ],
  providers: []
})
export class DashboardModule {}