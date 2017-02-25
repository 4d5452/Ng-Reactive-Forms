import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FiltersRoutingModule } from './filters-routing.module';
import { FiltersComponent } from './filters.component';
import { FiltersListComponent } from './filters-list.component';
import { FiltersService } from './filters.service';

@NgModule({
  imports: [ 
    CommonModule,
    FiltersRoutingModule
  ],
  declarations: [
    FiltersComponent,
    FiltersListComponent
  ],
  providers: [ FiltersService ]
})
export class FiltersModule {}