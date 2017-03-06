import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ColumnMetaObject } from '../store/models/table.models';

import { ItemTableService } from './item-table.service';
import { PopupService } from '../shared/popup/popup.service';

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

  isPopupOpen$: Observable<boolean>;

  filter: string = '';

  constructor(private itemTableService: ItemTableService, private popupService: PopupService) {}

  ngOnInit() {
    this.items$ = this.itemTableService.getItems();
    this.selected$ = this.itemTableService.getSelected();
    this.columns$ = this.itemTableService.getColumns();
    this.selectedColumn$ = this.itemTableService.getSelectedColumn();
    this.filter$ = this.itemTableService.getFilter();
    this.order$ = this.itemTableService.getSortOrder();

    this.isPopupOpen$ = this.popupService.isPopupOpen();
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
  removeSelectedItem(): void {
    this.itemTableService.removeSelectedItem();
  }
  openPopup(): void {
    this.popupService.open();
  }
}