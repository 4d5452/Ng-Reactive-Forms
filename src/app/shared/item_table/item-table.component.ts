import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { TableMetaData, SortOrder } from '../../store/models/table.models';

@Component({
  moduleId: module.id,
  selector: 'item-table',
  templateUrl: './item-table.component.html',
  styleUrls: [ './item-table.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemTableComponent {
  @Input() items: any[]; //itrable item array
  @Input() meta: TableMetaData;
  @Input() filter: string; //On selected sorting column, compare with each filter: filter[selectedColumn]===sortFilter
  @Input() selected: string; //Current selected filter

  @Output() select = new EventEmitter<any>(); //Selected filter
  @Output() clear = new EventEmitter<void>(); //clear selected filter
  @Output() setSelectedColumn = new EventEmitter<number>(); //change selected column
  @Output() sortOrder: SortOrder; //Data updates through 'items' in sorted order...

  _setSelectedColumn(column: number): void {
    this.setSelectedColumn.emit(column);
  }
  
  isVisible(item: any): boolean {
    let tmp = '' + item[this.meta.columns[this.meta.selectedColumn].selector];
    return tmp.includes(this.filter);
  }

  setSelected(item: any): void {
    // set new selected item
    this.select.emit(item);
  }
  clearSelected(): void {
    // called when selected item equals current selected item: clears selected
    this.clear.emit();
  }
  toggleSelected(item: any): void {
    // Called in html when user clicks table row:
    item.id===this.selected ? this.clearSelected() : this.setSelected(item);
  }
  isSelected(item: any): boolean {
    // md-checkbox uses this to set its status to checked
    return item.id===this.selected;
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