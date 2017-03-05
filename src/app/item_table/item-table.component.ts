import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ColumnMetaObject } from '../store/models/table.models';

import { ItemTableService } from './item-table.service';

import { Position } from '../store/models/position.models';

@Component({
  moduleId: module.id,
  selector: 'item-table',
  templateUrl: './item-table.component.html',
  styleUrls: [ './item-table.component.css' ]
})
export class ItemTableComponent implements OnInit {
  items$: Observable<any[]>;
  selected$: Observable<string>;
  columns$: Observable<ColumnMetaObject[]>;
  selectedColumn$: Observable<number>;
  filter$: Observable<string>;
  order$: Observable<string>;

  addView$: Observable<boolean>;
  addViewPosition$: Observable<Position>;

  filter: string = '';

  constructor(private itemTableService: ItemTableService) {}

  ngOnInit() {
    this.items$ = this.itemTableService.getItems();
    this.selected$ = this.itemTableService.getSelected();
    this.columns$ = this.itemTableService.getColumns();
    this.selectedColumn$ = this.itemTableService.getSelectedColumn();
    this.filter$ = this.itemTableService.getFilter();
    this.order$ = this.itemTableService.getSortOrder();

    this.addView$ = this.itemTableService.getAddView();
    this.addViewPosition$ = this.itemTableService.getAddViewPosition();
  }
  
  setSelect(id: string): void {
    this.itemTableService.setSelected(id);
  }
  setSelectedColumn(column: number): void {
    this.itemTableService.setSelectedColumn(column);
  }
  setOrder(order: string): void {
    this.itemTableService.setSortOrder(order);
  }
  setFilter(filter: string): void {
    this.itemTableService.setFilter(filter);
  }

  toggleAddView(): void {
    this.itemTableService.toggleAddView();
  }
  updateAddViewPosition(pos: Position): void {
    this.itemTableService.updateAddViewPosition(pos);
  }
    
  removeSelectedItem(): void {
    this.itemTableService.removeSelectedItem();
  }
  /*******RELOCATE */

  editVisible$: Observable<boolean> = Observable.of(false);
  toggleEditView(): void {
    console.log("TODO: editSelected");
    return;
  }
}