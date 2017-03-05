import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

const dashboardRoutes: Routes = [
  { 
    path: 'dashboard', component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'filters', pathMatch: 'full' },
      { path: 'filters', loadChildren: 'app/filters/filters.module#FiltersModule' },
      { path: 'records', loadChildren: 'app/records/records.module#RecordsModule' }
    ]
  },
];

@NgModule({
  imports: [ 
    RouterModule.forChild(dashboardRoutes)
  ],
  exports: [ RouterModule ]
})
export class DashboardRoutingModule {}