import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { PopupService } from '../core/popup.service';
import { CollectionService } from '../core/collection.service';
import { TableService } from '../core/table.service';

import { MetaObject } from '../store/models/collection.models';

@Component({
  moduleId: module.id,
  selector: 'data-card',
  templateUrl: './data-card.component.html',
  styleUrls: [ './data-card.component.css' ]
})
export class DataCardComponent implements OnInit {

  items$: Observable<any[]>;
  selectedItem$: Observable<string>;
  collectionMeta$: Observable<MetaObject[]>;

  popupOpen$: Observable<boolean>;

  constructor(private tableService: TableService, private popupService: PopupService,
    private collectionService: CollectionService) {}

  ngOnInit() {

    this.items$ = this.collectionService.getSelectedCollection();
    this.selectedItem$ = this.collectionService.getSelectedItemId();
    this.collectionMeta$ = this.collectionService.getCollectionMetaData();

    this.popupOpen$ = this.popupService.isPopupOpen();
  }

  openAddPopup(): void {
    console.log("TODO: Add New Item");
  }
  openEditPopup(): void {
    console.log("TODO: Edit Selected Item");
  }
  setSelectedItem(selected: string) {
    this.collectionService.setSelectedItemId(selected);
  }
  removeSelectedItem(): void {
    this.collectionService.removeSelectedItem();
  }
  setTableFilter(filter: string): void {
    this.tableService.setFilter(filter);
  }
  
}