import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ItemTableService } from './item-table.service';
import { PopupService } from '../shared/popup/popup.service';
import { CollectionService } from '../core/collection.service';

import { MetaObject } from '../store/models/collection.models';

@Component({
  moduleId: module.id,
  selector: 'item-table',
  templateUrl: './item-table.component.html',
  styleUrls: [ './item-table.component.css' ]
})
export class ItemTableComponent implements OnInit {
  items$: Observable<any[]>;
  selectedItem$: Observable<string>;
  collectionMeta$: Observable<MetaObject[]>;

  selectedColumnId$: Observable<number>;
  sortingFilter$: Observable<string>;
  sortOrder$: Observable<string>;

  isPopupOpen$: Observable<boolean>;

  constructor(private itemTableService: ItemTableService, private popupService: PopupService,
    private collectionService: CollectionService) {}

  ngOnInit() {
    this.items$ = this.collectionService.getSelectedCollection();
    this.selectedItem$ = this.collectionService.getSelectedItemId();
    this.collectionMeta$ = this.collectionService.getCollectionMetaData();
    
    this.selectedColumnId$ = this.itemTableService.getSelectedColumn();
    this.sortingFilter$ = this.itemTableService.getFilter();
    this.sortOrder$ = this.itemTableService.getSortOrder();

    this.isPopupOpen$ = this.popupService.isPopupOpen();
  }

  setSelectedItemId(selected: string) {
    this.collectionService.setSelectedItemId(selected);
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