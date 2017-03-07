import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { ItemTableComponent } from './item-table.component';
import { TableToolbarComponent } from './table_toolbar/table-toolbar.component';

import { TableModule } from '../table/table.module';

@NgModule({
  imports: [ 
    SharedModule,
    TableModule
  ],
  exports: [ ItemTableComponent ],
  declarations: [ 
    ItemTableComponent,
    TableToolbarComponent
  ],
  providers: [ ]
})
export class ItemTableModule {}