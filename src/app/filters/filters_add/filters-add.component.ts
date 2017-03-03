import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'filters-add',
  templateUrl: 'filters-add.component.html',
  styleUrls: [ 'filters-add.component.css' ]
})
export class FiltersAddComponent {
  @Output() close = new EventEmitter<void>();

  closeView(): void {
    this.close.emit();
    /**Handle reset of content, and warn if unsaved changes */
  }
}