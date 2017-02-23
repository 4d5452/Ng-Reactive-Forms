import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

const dashboardRoutes: Routes = [
  { 
    path: 'dashboard', component: DashboardComponent,
    children: [
      { path: 'items', loadChildren: 'app/items/items.module#ItemsModule' }
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