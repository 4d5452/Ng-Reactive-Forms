import { NgModule } from '@angular/core';

import { SetHeightDirective } from './set-height.directive';
import { GetHeightDirective } from './get-height.directive';

@NgModule({
  imports: [],
  exports: [ 
    SetHeightDirective,
    GetHeightDirective
  ],
  declarations: [
    SetHeightDirective,
    GetHeightDirective
  ]
})
export class SharedModule {}