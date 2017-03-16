import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { DataCardComponent } from '../data_card/data-card.component';
import { DataCardToolbarComponent } from '../data_card_toolbar/data-card-toolbar.component';

import { TableComponent } from '../table/table.component';
import { TableViewComponent } from '../table/table-view.component';

import { FiltersComponent } from '../filters/filters.component';
import { FiltersModifyComponent } from '../filters/filters-modify.component';

import { FilterTypesComponent } from '../filter_types/filter-types.component';
import { FilterTypesModifyComponent } from '../filter_types/filter-types-modify.component';

import { RecordsComponent } from '../records/records.component';

import { EquipmentComponent } from '../equipment/equipment.component';

import { EquipmentAssignmentsComponent } from '../equipment_assignments/assignments.component';

import { PopupComponent } from '../popup/popup.component';
import { PopupContentComponent } from '../popup_controller/controller.component';

@NgModule({
  imports: [ 
    SharedModule,
    DashboardRoutingModule
 ],
  exports: [],
  declarations: [ 
    DashboardComponent,
    DataCardComponent,
    DataCardToolbarComponent,
    TableComponent,
    TableViewComponent,
    RecordsComponent,
    FiltersComponent,
    FiltersModifyComponent,
    FilterTypesComponent,
    FilterTypesModifyComponent,
    EquipmentComponent,
    EquipmentAssignmentsComponent,
    PopupComponent,
    PopupContentComponent
 ],
  providers: []
})
export class DashboardModule {}