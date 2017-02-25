import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FiltersComponent } from './filters.component';
import { FiltersListComponent } from './filters-list.component';

const routes: Routes = [
  { 
    path: '', component: FiltersComponent,
    children: []
  },
];

@NgModule({
  imports: [ 
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule ]
})
export class FiltersRoutingModule {}