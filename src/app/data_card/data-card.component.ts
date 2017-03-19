import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

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
export class DataCardComponent implements OnInit, OnDestroy {

  items$: Observable<any[]>;
  selectedItem$: Observable<string>;
  collectionMeta$: Observable<MetaObject[]>;
  collectionId$: Subscription;
  collectionId: string;
  filter$: Observable<string>;
  isPopupOpen$: Observable<boolean>;

  constructor(private tableService: TableService, private popupService: PopupService,
    private collectionService: CollectionService) {}

  ngOnInit() {
    this.items$ = this.collectionService.getSelectedCollection();
    this.selectedItem$ = this.collectionService.getSelectedItemId();
    this.collectionMeta$ = this.collectionService.getCollectionMetaData();
    this.collectionId$ =this.collectionService.getSelectedCollectionId()
      .subscribe((id)=> {
        this.collectionId = id;
      })
    this.filter$ = this.tableService.getFilter();
    this.isPopupOpen$ = this.popupService.isPopupOpen();
  }
  ngOnDestroy() {
    this.collectionId$.unsubscribe();
  }

  openPopup(task: string): void {
    this.popupService.openPopup(task);
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