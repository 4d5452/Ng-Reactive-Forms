import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';

import { FiltersRoutingModule } from './filters-routing.module';
import { FiltersComponent } from './filters.component';
import { FiltersListComponent } from './filters-list.component';
import { FiltersService } from './filters.service';

@NgModule({
  imports: [ 
    CommonModule,
    MaterialModule,
    FiltersRoutingModule
  ],
  declarations: [
    FiltersComponent,
    FiltersListComponent
  ],
  providers: [ FiltersService ]
})
export class FiltersModule {}