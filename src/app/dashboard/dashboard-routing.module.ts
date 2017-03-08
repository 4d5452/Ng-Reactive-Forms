import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

import { FiltersComponent } from '../filters/filters.component';
import { FiltersModifyComponent } from '../filters/filters-modify.component';

import { RecordsComponent } from '../records/records.component';

import { PopupComponent } from '../popup/popup.component';
import { PopupGuardService } from '../core/popup-guard.service';

const dashboardRoutes: Routes = [
  { 
    path: 'dashboard', component: DashboardComponent, canActivateChild: [PopupGuardService],
    children: [
      { path: '', redirectTo: 'filters', pathMatch: 'full' },
      { path: 'filters', component: FiltersComponent },
      { path: 'records', component: RecordsComponent },
      { path: 'popup', 
        children: [
          { path: 'filters', component: FiltersModifyComponent, outlet: 'collection'}
        ]
      }
    ]
  }
];

@NgModule({
  imports: [ 
    RouterModule.forChild(dashboardRoutes)
  ],
  exports: [ RouterModule ]
})
export class DashboardRoutingModule {}