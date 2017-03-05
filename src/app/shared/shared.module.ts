import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { MaterialModule } from '@angular/material';

import { SetHeightDirective } from './set-height.directive';
import { GetHeightDirective } from './get-height.directive';
import { DraggableDirective } from './draggable.directive';
import { ItemTableComponent } from './item_table/item-table.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ],
  exports: [ 
    /**SharedModules */
    CommonModule,
    FormsModule,
    MaterialModule,

    /**AppComponents */
    SetHeightDirective,
    GetHeightDirective,
    DraggableDirective,
    ItemTableComponent
  ],
  declarations: [
    SetHeightDirective,
    GetHeightDirective,
    DraggableDirective,
    ItemTableComponent
  ]
})
export class SharedModule {}