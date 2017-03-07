import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from '../store/reducers/index';

import * as actions from '../store/actions/collection.actions';

import { HttpCollectionService } from './http-collection.service';
import { MetaObject } from '../store/models/collection.models';

@Injectable()
export class CollectionService {
  selectedCollectionId$: Observable<string>;
  selectedItemId$: Observable<string>;
  collection$: Observable<any[]>; //This one little dog...
  meta$: Observable<MetaObject[]>;

  constructor(private store: Store<fromRoot.State>, private httpCollectionService: HttpCollectionService) {
    this.selectedCollectionId$ = this.store.select<string>(fromRoot.collectionGetSelectedCollectionId);
    this.selectedItemId$ = this.store.select<string>(fromRoot.collectionGetSelectedId);
    this.collection$ = this.store.select<any[]>(fromRoot.collectionGetCollection);
    this.meta$ = this.store.select<MetaObject[]>(fromRoot.collectionGetMetaData);
  }
  
  setSelectedItemId(id: string): void {
    this.store.dispatch(new actions.SetSelectedItemIdAction(id));
  }
  getSelectedItemId(): Observable<string> {
    return this.selectedItemId$;
  }
  getSelectedCollectionId(): Observable<string> {
    return this.selectedCollectionId$;
  }
  getSelectedCollection(): Observable<any[]> {
    return this.collection$;
  }
  setCollectionMetaData(collection: string, meta: MetaObject[]): void {
    this.store.dispatch(new actions.SetCollectionMetaDataAction(
      {collection: collection, meta: meta}
    ));
  }
  getCollectionMetaData(): Observable<MetaObject[]> {
    return this.meta$;
  }
  /**Require HTTP */
  removeSelectedItem(): void {
    this.store.dispatch(new actions.RemoveSelectedItemAction(null));
  }
}