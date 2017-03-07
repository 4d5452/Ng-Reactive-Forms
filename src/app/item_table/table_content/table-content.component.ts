import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { MetaObject, Type } from '../../store/models/collection.models';

@Component({
  moduleId: module.id,
  selector: 'table-content',
  templateUrl: './table-content.component.html',
  styleUrls: [ './table-content.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableContentComponent {
  @Input() items: any[];
  @Input() selectedItem: string;
  @Input() collectionMeta: MetaObject[];
  @Input() selectedColumnId: number;
  @Input() sortingFilter: string;
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
  format(value: any, type: string): any {
    let tmp: any = null;
    switch(type) {
      case Type.DATE: {
        tmp = new Date(value);
        return tmp.toLocaleDateString();
      }
      case Type.NUMBER:
      case Type.STRING:
      default: 
        return value;
    }
  }

  isItemVisible(item: any): boolean {
    let tmp = '' + item[this.collectionMeta[this.selectedColumnId].selector];
    return tmp.includes(this.sortingFilter);
  }
}