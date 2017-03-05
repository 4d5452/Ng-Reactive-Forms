import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { FiltersRoutingModule } from './filters-routing.module';
import { FiltersComponent } from './filters.component';
import { FiltersAddComponent } from './filters_add/filters-add.component';
import { FiltersService } from './filters.service';


@NgModule({
  imports: [ 
    SharedModule,
    FiltersRoutingModule
  ],
  declarations: [
    FiltersComponent,
    FiltersAddComponent
  ],
  providers: [ FiltersService ]
})
export class FiltersModule {}