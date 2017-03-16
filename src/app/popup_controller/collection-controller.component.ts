import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { CollectionService } from '../core/collection.service';
import { FormGroupsService } from '../core/form-groups.service';
import { PopupService } from '../core/popup.service';

import { MetaObject } from '../store/models/collection.models';

@Component({
  moduleId: module.id,
  selector: 'popup-collection-controller',
  templateUrl: './collection-controller.component.html'
})
export class PopupCollectionControllerComponent {
  selectedCollectionId$: Observable<string>;
  selectedItemId$: Observable<string>;
  selectedCollectionMeta$: Observable<MetaObject[]>;
  popupTask$: Observable<string>;

  constructor(private popupService: PopupService, private collectionService: CollectionService,
    private formGroupService: FormGroupsService) {
    this.selectedCollectionId$ = collectionService.getSelectedCollectionId();
    this.selectedItemId$ = collectionService.getSelectedItemId();
    this.selectedCollectionMeta$ = collectionService.getCollectionMetaData();
    this.popupTask$ = popupService.getPopupTask();
  }

  submit(item: any, collection: string): void {
    console.log(item, collection);
    //this.collectionService.addEditItem(item, collection);
    this.closePopup();
  }
  closePopup(): void {
    this.popupService.closePopup();
  }
}