import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'add-view',
  templateUrl: 'add-view.component.html',
  styleUrls: [ 'add-view.component.css' ]
})
export class AddViewComponent {
  @Output() close = new EventEmitter<void>();

  closeView(): void {
    this.close.emit();
    /**Handle reset of content, and warn if unsaved changes */
  }
}
