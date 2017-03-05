import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';

import { ItemTableComponent } from './item-table.component';
import { TableViewComponent } from './table-view.component';
import { ItemTableService } from './item-table.service';

@NgModule({
  imports: [ 
    CommonModule,
    MaterialModule
  ],
  exports: [ ItemTableComponent ],
  declarations: [ 
    ItemTableComponent,
    TableViewComponent
  ],
  providers: [ ItemTableService ]
})
export class ItemTableModule {}