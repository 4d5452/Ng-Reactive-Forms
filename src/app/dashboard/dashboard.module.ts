import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';

import { SharedModule } from '../shared/shared.module';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { ItemTableModule } from '../item_table/item-table.module';

@NgModule({
  imports: [ 
    SharedModule,
    ItemTableModule,
    DashboardRoutingModule
 ],
  exports: [],
  declarations: [ 
    DashboardComponent
 ],
  providers: []
})
export class DashboardModule {}