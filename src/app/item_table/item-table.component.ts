import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ColumnMetaObject } from '../store/models/table.models';

import { ItemTableService } from './item-table.service';
import { PopupService } from '../shared/popup/popup.service';
import { CollectionService } from '../core/collection.service';

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

  constructor(private itemTableService: ItemTableService, private popupService: PopupService,
    private collectionService: CollectionService) {}

  ngOnInit() {
    this.items$ = this.collectionService.getSelectedCollection();
    this.selected$ = this.collectionService.getSelectedItemId();

    this.columns$ = this.itemTableService.getColumns();
    this.selectedColumn$ = this.itemTableService.getSelectedColumn();
    this.filter$ = this.itemTableService.getFilter();
    this.order$ = this.itemTableService.getSortOrder();

    this.isPopupOpen$ = this.popupService.isPopupOpen();
  }

  setSelectedItemId(selected: string) {
    this.collectionService.setSelectedItemId(selected);
  }
  clearSelectedItemId(): void {
    this.setSelectedItemId('');
  }
  removeSelectedItem(): void {
    this.collectionService.removeSelectedItem();
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
  openPopup(): void {
    this.popupService.open();
  }
}