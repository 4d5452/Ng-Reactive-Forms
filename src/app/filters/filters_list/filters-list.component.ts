import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Filter } from '../../store/models/app.models';

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
  toggleSelected(filter: Filter): void {
    filter.id===this.selected ? this.clearSelected() : this.setSelected(filter);
  }
  isSelected(filter: Filter): boolean {
    return filter.id===this.selected;
  }
}