import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ItemsComponent } from './items.component';
import { ItemsListComponent } from './items-list.component';
import { ItemDetailComponent } from './item-detail.component';

const itemsRoutes: Routes = [
  {
    path: '', component: ItemsComponent,
    children: [
      { path: '', component: ItemsListComponent },
      { path: ':id', component: ItemDetailComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(itemsRoutes)
  ],
  exports: [ RouterModule ]
})
export class ItemsRoutingModule {}