import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { DataViewComponent } from './data-view.component';
import { TableToolbarComponent } from './table_toolbar/table-toolbar.component';

import { TableModule } from '../table/table.module';

@NgModule({
  imports: [ 
    SharedModule,
    TableModule
  ],
  exports: [ DataViewComponent ],
  declarations: [ 
    DataViewComponent,
    TableToolbarComponent
  ],
  providers: [ ]
})
export class DataViewModule {}