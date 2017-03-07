import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from '../store/reducers/index';

import * as actions from '../store/actions/collection.actions';

import { HttpCollectionService } from './http-collection.service';

@Injectable()
export class CollectionService {
  selectedCollectionId$: Observable<string>;
  selectedItemId$: Observable<string>;
  collection$: Observable<any[]>;

  selectedCollectionId: string;

  constructor(private store: Store<fromRoot.State>, private httpCollectionService: HttpCollectionService) {
    this.selectedCollectionId$ = this.store.select<string>(fromRoot.collectionGetSelectedCollectionId);
    this.selectedItemId$ = this.store.select<string>(fromRoot.collectionGetSelectedId);
    this.collection$ = this.store.select<any[]>(fromRoot.collectionGetCollection);
  }
  
  setSelectedItemId(id: string): void {
    this.store.dispatch(new actions.SetSelectedItemIdAction(id));
  }
  getSelectedItemId(): Observable<string> {
    return this.selectedItemId$;
  }
  setSelectedCollectionId(id: string): void {
    this.store.dispatch(new actions.SetSelectedCollectionIdAction(id));
  }
  getSelectedCollectionId(): Observable<string> {
    return this.selectedCollectionId$;
  }
  getSelectedCollection(): Observable<any[]> {
    return this.collection$;
  }
}