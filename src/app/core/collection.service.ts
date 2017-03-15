import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from '../store/reducers/index';

import * as actions from '../store/actions/collection.actions';
import * as httpActions from '../store/actions/http.actions';

import { HttpCollectionService } from './http-collection.service';
import { MetaObject } from '../store/models/collection.models';

@Injectable()
export class CollectionService {
  /**Identifier of the currently selected collection.  Will relate to http-colleciton.service mapping of application collections */
  selectedCollectionId$: Observable<string>;
  /**The selected item ID of the currently selected collection */
  selectedItemId$: Observable<string>;
  /**An Observable of the selected collection */
  collection$: Observable<any[]>; //This one little dog...
  /**Meta data set for the currently active collection */
  meta$: Observable<MetaObject[]>;

  constructor(private store: Store<fromRoot.State>, private httpCollectionService: HttpCollectionService) {
    this.selectedCollectionId$ = this.store.select<string>(fromRoot.collectionGetSelectedCollectionId);
    this.selectedItemId$ = this.store.select<string>(fromRoot.collectionGetSelectedId);
    this.collection$ = this.store.select<any[]>(fromRoot.collectionGetCollection);
    this.meta$ = this.store.select<MetaObject[]>(fromRoot.collectionGetMetaData);
  }
  
  /**getters/setters for selectedItemId$ */
  setSelectedItemId(id: string): void {
    this.store.dispatch(new actions.SetSelectedItemIdAction(id));
  }
  getSelectedItemId(): Observable<string> {
    return this.selectedItemId$;
  }
  /**Calls the httpCollectionService the selected item, within the selectedCollection */
  getSelectedItem(): Observable<any> {
    return this.selectedItemId$
      .mergeMap((item: string) => this.selectedCollectionId$, 
        (id: string, collection: string) => {
          return this.httpCollectionService.getItemById(id, collection);
        })
        .switchMap((item)=>{
          return item;
        })
  }
  /**getter for selectedCollectionId$ */
  getSelectedCollectionId(): Observable<string> {
    return this.selectedCollectionId$;
  }
  /**getter for currently selected collection */
  getSelectedCollection(): Observable<any[]> {
    return this.collection$;
  }
  /**getter/setter for collection meta data */
  setCollection(collection: string): void {
    this.store.dispatch(new actions.SetCollectionAction(collection));
  }
  getCollectionMetaData(): Observable<MetaObject[]> {
    return this.meta$;
  }

  /**Non-selected collection: return 'any' collection from httpCollectionService */
  getCollection(collection: string): Observable<any[]> {
    return this.httpCollectionService.getCollection(collection);
  }
  /**Require HTTP: removes selected item; effect will take over once called */
  removeSelectedItem(): void {
    this.store.dispatch(new actions.RemoveSelectedItemAction(null));
  }
  /**TODO: Create effect to handle this procedure */
  addEditItem(item: any, collection: string): void {
    this.store.dispatch(new httpActions.PutAction({
      id: item['id'],
      collection: collection,
      body: item
    }));
  }
}