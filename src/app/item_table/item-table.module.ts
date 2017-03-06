import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { ItemTableComponent } from './item-table.component';
import { TableToolbarComponent } from './table_toolbar/table-toolbar.component';
import { TableContentComponent } from './table_content/table-content.component';
import { ItemTableService } from './item-table.service';

@NgModule({
  imports: [ 
    SharedModule
  ],
  exports: [ ItemTableComponent ],
  declarations: [ 
    ItemTableComponent,
    TableToolbarComponent,
    TableContentComponent
  ],
  providers: [ ItemTableService ]
})
export class ItemTableModule {}