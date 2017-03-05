import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { ColumnMetaObject, SortOrder } from '../../store/models/table.models';

@Component({
  moduleId: module.id,
  selector: 'table-content',
  templateUrl: './table-content.component.html',
  styleUrls: [ './table-content.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableContentComponent {
  @Input() items: any[];
  @Input() selected: string;
  @Input() columns: ColumnMetaObject;
  @Input() selectedColumn: number;
  @Input() filter: string;
  @Input() order: SortOrder;

  @Output() select = new EventEmitter<string>();
  @Output() selectColumn = new EventEmitter<number>();
  @Output() setOrder = new EventEmitter<SortOrder>();

  toggleSelected(item: any): void {
    // Called in html when user clicks table row:
    let newSelected = (item.id===this.selected) ?  '' : item.id;
    this.select.emit(newSelected);
  }
  setSelectedColumn(column: number): void {
    this.selectColumn.emit(column);
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
  isVisible(item: any): boolean {
    let tmp = '' + item[this.columns[this.selectedColumn].selector];
    return tmp.includes(this.filter);
  }
}