import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { MetaObject, Type } from '../store/models/collection.models';

@Component({
  moduleId: module.id,
  selector: 'table-view',
  templateUrl: './table-view.component.html',
  styleUrls: [ './table-view.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableViewComponent {
  @Input() items: any[];
  @Input() selectedItem: string;
  @Input() collectionMeta: MetaObject[];
  @Input() selectedColumn: number;
  @Input() filter: string;
  @Input() sortOrder: string;

  @Output() selectItem = new EventEmitter<string>();
  @Output() selectColumn = new EventEmitter<number>();
  @Output() setSortOrder = new EventEmitter<string>();

  toggleSelectedItem(item: any): void {
    // Called in html when user clicks table row:
    let newSelected = (item.id===this.selectedItem) ?  '' : item.id;
    this.selectItem.emit(newSelected);
  }
  setSelectedColumn(column: number): void {
    this.selectColumn.emit(column);
  }
  isItemSelected(item: any): boolean {
    // md-checkbox uses this to set its status to checked
    return item.id===this.selectedItem;
  }
  isColumnSelected(column: number): boolean {
    return column===this.selectedColumn;
  }
  format(value: any, type: string): any {
    let tmp: any = null;
    switch(type) {
      case Type.DATE: {
        tmp = new Date(value);
        return tmp.toLocaleDateString();
      }
      case Type.BOOLEAN: {
        return value ? 'TRUE' : 'FALSE'
      }
      case Type.STRING: {
        tmp = "" + value;
        return tmp.toUpperCase();
      }
      case Type.NUMBER:
      default: 
        return value;
    }
  }
  /**THIS IS GARBAGE: TODO: MUST CHANGE AS SOON AS POSSIBLE!!!!!!!!!!!!!!!!!!!!!! */
  isItemVisible(item: any): boolean {
    let tmp = '';
    tmp = '' + item[this.collectionMeta[this.selectedColumn].selector[0]];
    return tmp.includes(this.filter.toUpperCase());
  }
}