import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { TableComponent } from './table.component';
import { TableViewComponent } from './table-view.component';

@NgModule({
  imports: [ 
    SharedModule
  ],
  exports: [ 
    TableComponent
  ],
  declarations: [ 
    TableComponent,
    TableViewComponent
  ],
  providers: []
})
export class TableModule {}