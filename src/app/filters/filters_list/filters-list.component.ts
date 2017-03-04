import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Filter, TableMetaData, SortDefs } from '../../store/models/app.models';

@Component({
  moduleId: module.id,
  selector: 'filters-list',
  templateUrl: './filters-list.component.html',
  styleUrls: [ './filters-list.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FiltersListComponent {
  @Input() filters: Filter[]; //All filters
  @Input() meta: TableMetaData;
  
  @Input() sortFilter: string; //On selected sorting column, compare with each filter: filter[selectedColumn]===sortFilter

  @Output() setSelectedColumn = new EventEmitter<number>(); //change selected column

  _setSelectedColumn(column: number): void {
    this.setSelectedColumn.emit(column);
  }

  @Output() sortOrder: SortDefs; //Data updates through 'filters' in sorted order...
  
  isVisible(filter: Filter): boolean {
    let tmp = '' + filter[this.meta.columns[this.meta.selectedColumn].selector];

    return tmp.includes(this.sortFilter);
  }

  /************Selected Functions/Input/Output */
  /**
   * Controls display features of table with regards to the currently selected
   * table item: in this case, a filter
   */
  @Input() selected: string; //Current selected filter
  @Output() select = new EventEmitter<Filter>(); //Selected filter
  @Output() clear = new EventEmitter<void>(); //clear selected filter
  
  setSelected(filter: Filter): void {
    // set new selected item
    this.select.emit(filter);
  }
  clearSelected(): void {
    // called when selected item equals current selected item: clears selected
    this.clear.emit();
  }
  toggleSelected(filter: Filter): void {
    // Called in html when user clicks table row:
    filter.id===this.selected ? this.clearSelected() : this.setSelected(filter);
  }
  isSelected(filter: Filter): boolean {
    // md-checkbox uses this to set its status to checked
    return filter.id===this.selected;
  }
  format(value: any, type: string): any {
    let tmp: any = null;
    switch(type) {
      case 'date': {
        tmp = new Date(value);
        return tmp.toLocaleDateString();
      }
      default: 
        return value;
    }
  }
}