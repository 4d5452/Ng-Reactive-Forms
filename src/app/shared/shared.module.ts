import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { MaterialModule } from '@angular/material';

import { SetHeightDirective } from './set-height.directive';
import { GetHeightDirective } from './get-height.directive';
import { DraggableDirective } from './draggable.directive';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    MaterialModule
  ],
  exports: [ 
    /**SharedModules */
    RouterModule,
    CommonModule,
    FormsModule,
    MaterialModule,

    /**AppComponents */
    SetHeightDirective,
    GetHeightDirective,
    DraggableDirective
  ],
  declarations: [
    SetHeightDirective,
    GetHeightDirective,
    DraggableDirective
  ],
  providers: []
})
export class SharedModule {}