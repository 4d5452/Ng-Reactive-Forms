import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { ItemsComponent } from '../items/items.component';
import { ItemsService } from '../items/items.service';

@NgModule({
  imports: [ 
    CommonModule,
    MaterialModule,
    DashboardRoutingModule
 ],
  exports: [],
  declarations: [ 
    DashboardComponent,
    ItemsComponent
 ],
  providers: [
    ItemsService
  ]
})
export class DashboardModule {}