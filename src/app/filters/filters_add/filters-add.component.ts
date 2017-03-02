import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Position as Pos } from '../../store/models/position.models';

@Component({
  moduleId: module.id,
  selector: 'filters-add',
  templateUrl: 'filters-add.component.html',
  styleUrls: [ 'filters-add.component.css' ]
})
export class FiltersAddComponent {
  @Input() position: Pos;
  @Output() changePosition = new EventEmitter<Pos>();

  @Output() _close = new EventEmitter<null>();

  
  handleChangePosition(pos: Pos){
    if(this.position.left != pos.left || this.position.top != pos.top){
      this.changePosition.emit(pos)
    }
  }

  close(): void {
    this._close.emit();
    /**Handle reset of content, and warn if unsaved changes */
  }
}