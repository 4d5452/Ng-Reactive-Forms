import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

import { FiltersComponent } from '../filters/filters.component';
import { FiltersModifyComponent } from '../filters/filters-modify.component';

import { FilterTypesComponent } from '../filter_types/filter-types.component';
import { FilterTypesModifyComponent } from '../filter_types/filter-types-modify.component';

import { RecordsComponent } from '../records/records.component';
import { RecordsModifyComponent } from '../records/records-modify.component';

import { EquipmentComponent } from '../equipment/equipment.component';
import { EquipmentModifyComponent } from '../equipment/equipment-modify.component';

import { EquipmentAssignmentsComponent } from '../equipment_assignments/assignments.component';

import { PopupComponent } from '../popup/popup.component';
import { PopupGuardService } from '../core/popup-guard.service';

const dashboardRoutes: Routes = [
  { 
    path: 'dashboard', component: DashboardComponent, canActivateChild: [PopupGuardService],
    children: [
      { path: '', redirectTo: 'filters', pathMatch: 'full' },
      { path: 'filters', children: [
        { path: '', component: FiltersComponent },
        { path: 'modify', component: FiltersModifyComponent, outlet: 'popup'}
      ] },
      { path: 'records', children: [
        { path: '', component: RecordsComponent },
        { path: 'modify', component: RecordsModifyComponent, outlet: 'popup'}
      ] },
      { path: 'filter-types', children: [
        { path: '', component: FilterTypesComponent },
        { path: 'modify', component: FilterTypesModifyComponent, outlet: 'popup' }
      ] },
      { path: 'equipment', children: [
        { path: '', component: EquipmentComponent },
        { path: 'modify', component: EquipmentModifyComponent, outlet: 'popup' }
      ] },
      { path: 'assignments', component: EquipmentAssignmentsComponent }
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