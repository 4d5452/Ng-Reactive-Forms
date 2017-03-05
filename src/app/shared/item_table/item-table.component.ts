import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ColumnMetaObject, SortOrder } from '../../store/models/table.models';

import { ItemTableService } from './item-table.service';

@Component({
  moduleId: module.id,
  selector: 'item-table',
  template: `
    <table-view
      [items]="items$ | async"
      [selected]="selected$ | async"
      [columns]="columns$ | async"
      [selectedColumn]="selectedColumn$ | async"
      [filter]="filter$ | async"
      [order]="order$ | async"
      (select)="setSelect($event)"
      (selectColumn)="setSelectedColumn($event)"
      (setOrder)="setOrder($event)">
    </table-view>
  `
})
export class ItemTableComponent implements OnInit {
  items$: Observable<any[]>;
  selected$: Observable<string>;
  columns$: Observable<ColumnMetaObject[]>;
  selectedColumn$: Observable<number>;
  filter$: Observable<string>;
  order$: Observable<SortOrder>;

  constructor(private itemTableService: ItemTableService) {}

  ngOnInit() {
    this.items$ = this.itemTableService.getItems();
    this.selected$ = this.itemTableService.getSelected();
    this.columns$ = this.itemTableService.getColumns();
    this.selectedColumn$ = this.itemTableService.getSelectedColumn();
    this.filter$ = this.itemTableService.getFilter();
    this.order$ = this.itemTableService.getSortOrder();
  }
  
  setSelect(id: string): void {
    this.itemTableService.setSelected(id);
  }
  setSelectedColumn(column: number): void {
    this.itemTableService.setSelectedColumn(column);
  }
  setOrder(order: SortOrder): void {
    this.itemTableService.setSortOrder(order);
  }
}