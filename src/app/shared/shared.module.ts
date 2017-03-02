import { NgModule } from '@angular/core';

import { SetHeightDirective } from './set-height.directive';
import { GetHeightDirective } from './get-height.directive';
import { DraggableDirective } from './draggable.directive';

@NgModule({
  imports: [],
  exports: [ 
    SetHeightDirective,
    GetHeightDirective,
    DraggableDirective
  ],
  declarations: [
    SetHeightDirective,
    GetHeightDirective,
    DraggableDirective
  ]
})
export class SharedModule {}