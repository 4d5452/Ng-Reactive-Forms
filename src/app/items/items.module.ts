import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemsRoutingModule } from './items-routing.module';
import { ItemsComponent } from './items.component';
import { ItemsListComponent } from './items-list.component';
import { ItemDetailComponent } from './item-detail.component';
import { ItemsService } from './items.service';

@NgModule({
  imports: [ 
    CommonModule,
    ItemsRoutingModule
 ],
  exports: [],
  declarations: [
    ItemsComponent,
    ItemsListComponent,
    ItemDetailComponent
  ],
  providers: [ ItemsService ]
})
export class ItemsModule {}