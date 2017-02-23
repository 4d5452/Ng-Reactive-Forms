import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { ItemsModule } from '../items/items.module';

@NgModule({
  imports: [ 
    CommonModule,
    MaterialModule,
    DashboardRoutingModule,
    ItemsModule
 ],
  exports: [],
  declarations: [ 
    DashboardComponent
 ],
  providers: []
})
export class DashboardModule {}