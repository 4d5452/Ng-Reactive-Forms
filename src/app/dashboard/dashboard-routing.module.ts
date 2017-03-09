import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

import { FiltersComponent } from '../filters/filters.component';
import { FiltersModifyComponent } from '../filters/filters-modify.component';

import { FilterTypesComponent } from '../filter_types/filter-types.component';

import { RecordsComponent } from '../records/records.component';

import { PopupComponent } from '../popup/popup.component';
import { PopupGuardService } from '../core/popup-guard.service';
import { PopupGuardNotService } from '../core/popup-guard-not.service';

const dashboardRoutes: Routes = [
  { 
    path: 'dashboard', component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'filters', pathMatch: 'full', canActivate: [PopupGuardService] },
      { path: 'filters', component: FiltersComponent, canActivate: [PopupGuardService] },
      { path: 'records', component: RecordsComponent, canActivate: [PopupGuardService] },
      { path: 'filter-types', component: FilterTypesComponent, canActivate: [PopupGuardService] },
      { path: 'popup', 
        children: [
          { path: 'filters', component: FiltersModifyComponent, outlet: 'collection', canActivate: [PopupGuardNotService]}
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