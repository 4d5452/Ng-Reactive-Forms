import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FiltersRoutingModule } from './filters-routing.module';
import { FiltersComponent } from './filters.component';

@NgModule({
  imports: [ 
    CommonModule,
    FiltersRoutingModule
  ],
  declarations: [
    FiltersComponent
  ],
  exports: [ FiltersComponent ]
})
export class FiltersModule {}