import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { PopupService } from '../shared/popup/popup.service';
import { CollectionService } from '../core/collection.service';
import { TableService } from '../core/table.service';

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

  isPopupOpen$: Observable<boolean>;

  constructor(private tableService: TableService, private popupService: PopupService,
    private collectionService: CollectionService) {}

  ngOnInit() {
    this.items$ = this.collectionService.getSelectedCollection();
    this.selectedItem$ = this.collectionService.getSelectedItemId();
    this.collectionMeta$ = this.collectionService.getCollectionMetaData();

    this.isPopupOpen$ = this.popupService.isPopupOpen();
  }

  setSelectedItem(selected: string) {
    this.collectionService.setSelectedItemId(selected);
  }
  removeSelectedItem(): void {
    this.collectionService.removeSelectedItem();
  }
  setFilter(filter: string): void {
    this.tableService.setFilter(filter);
  }
  
  openPopup(): void {
    this.popupService.open();
  }
}

/**
 * 
    <table-content
      [items]="items$ | async"
      [selectedItem]="selectedItem$ | async"
      [collectionMeta]="collectionMeta$ | async"
      [selectedColumnId]="selectedColumnId$ | async"
      [sortingFilter]="sortingFilter$ | async"
      [sortOrder]="srotOrder$ | async"
      (selectItem)="setSelectedItemId($event)"
      (selectColumn)="setSelectedColumn($event)"
      (setSortOrder)="setSortOrder($event)">
    </table-content>
 */