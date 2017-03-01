import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';

import { SharedModule } from '../shared/shared.module';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardSplashComponent } from './dashboard-splash.component';

import { FiltersModule} from '../filters/filters.module';

@NgModule({
  imports: [ 
    CommonModule,
    MaterialModule,
    SharedModule,
    DashboardRoutingModule
 ],
  exports: [],
  declarations: [ 
    DashboardComponent,
    DashboardSplashComponent
 ],
  providers: []
})
export class DashboardModule {}