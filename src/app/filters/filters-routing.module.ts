import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FiltersComponent } from './filters.component';
import { FiltersAddViewComponent } from './filters-add-view.component';

const routes: Routes = [
  {path: '', component: FiltersComponent},
  {path: 'add', component: FiltersAddViewComponent, outlet: 'add-view'}
];

@NgModule({
  imports: [ 
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule ]
})
export class FiltersRoutingModule {}