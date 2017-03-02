import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';

import { SharedModule } from '../shared/shared.module';

import { FiltersRoutingModule } from './filters-routing.module';
import { FiltersComponent } from './filters.component';
import { FiltersListComponent } from './filters_list/filters-list.component';
import { FiltersAddComponent } from './filters_add/filters-add.component';
import { FiltersService } from './filters.service';

@NgModule({
  imports: [ 
    CommonModule,
    SharedModule,
    MaterialModule,
    FiltersRoutingModule
  ],
  declarations: [
    FiltersComponent,
    FiltersListComponent,
    FiltersAddComponent
  ],
  providers: [ FiltersService ]
})
export class FiltersModule {}