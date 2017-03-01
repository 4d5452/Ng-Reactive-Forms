import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Filter } from '../store/models/app.models';

@Component({
  moduleId: module.id,
  selector: 'filters-list',
  templateUrl: './filters-list.component.html',
  styleUrls: [ './filters-list.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FiltersListComponent {
  @Input() filters: Filter[];
  @Input() selected: string;  
  @Output() select = new EventEmitter<Filter>();
  @Output() clear = new EventEmitter<void>();

  setSelected(filter: Filter): void {
    this.select.emit(filter);
  }
  clearSelected(): void {
    this.clear.emit();
  }
  checkboxToggle(filter: Filter, event: Event): void {
    console.log(filter, event);
    filter.id!==this.selected ? this.setSelected(filter) : this.clearSelected();
  }
}