import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

import { FiltersComponent } from '../filters/filters.component';
import { FiltersAddViewComponent } from '../filters/filters-add-view.component';

const dashboardRoutes: Routes = [
  { 
    path: 'dashboard', component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'filters', pathMatch: 'full' },
      { path: 'filters', component: FiltersComponent, children: [
        { path: 'add', component: FiltersAddViewComponent, outlet: 'popup'}
      ] },
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