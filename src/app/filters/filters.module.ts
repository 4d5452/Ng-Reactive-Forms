import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { FiltersRoutingModule } from './filters-routing.module';
import { FiltersComponent } from './filters.component';
import { FiltersService } from './filters.service';


@NgModule({
  imports: [ 
    SharedModule,
    FiltersRoutingModule
  ],
  declarations: [
    FiltersComponent
  ],
  providers: [ FiltersService ]
})
export class FiltersModule {}