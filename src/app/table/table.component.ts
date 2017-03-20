import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy,
OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { TableService } from '../core/table.service';

import { MetaObject } from '../store/models/collection.models';

@Component({
  moduleId: module.id,
  selector: 'data-table',
  templateUrl: './table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnChanges{
  @Input() items: any[];
  @Input() selectedItem: string;
  @Input() collectionMeta: MetaObject[];

  @Output() selectItem = new EventEmitter<string>();

  selectedColumn$: Observable<number>;
  sortOrder$: Observable<string>;
  filter$: Observable<string>;

  constructor(private tableService: TableService) {
    this.selectedColumn$ = tableService.getSelectedColumn();
    this.sortOrder$ = tableService.getSortOrder();
    this.filter$ = tableService.getFilter();
  }

  
  ngOnChanges(changes: SimpleChanges): void {
    for(let propName in changes) {
      if(propName==="collectionMeta"){
        this.resetTable();
      }
    }
  }
  resetTable(): void {
    this.setSelectedItem('');
    this.setSelectedColumn(0);
    this.tableService.setFilter('');
  }

  setSelectedItem(selectedItem: string) {
    this.selectItem.emit(selectedItem);
  }

  setSelectedColumn(column: number): void {
    this.tableService.setSelectedColumn(column);
  }
  setSortOrder(order: string): void {
    this.tableService.setSortOrder(order);
  }
}