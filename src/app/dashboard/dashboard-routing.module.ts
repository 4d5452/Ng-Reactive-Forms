import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

const dashboardRoutes: Routes = [
  { path: '', 
    component: DashboardComponent,
    children: [
      {
        path: 'items',
        loadChildren: 'app/items/items.module#ItemsModule'
      }
    ]
  },
];

@NgModule({
  imports: [ 
    RouterModule.forChild(dashboardRoutes)
  ],
  exports: [ RouterModule ],
  providers: []
})
export class DashboardRoutingModule {}