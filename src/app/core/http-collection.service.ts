import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from '../store/reducers/index';

@Injectable()
export class HttpCollectionService {
  filter$: Observable<any[]>;
  filterTypes$: Observable<any[]>;
  collections: Map<string, Observable<any[]>>;
  collectionSelectors$: Observable<Set<string>>;

  constructor(private store: Store<fromRoot.State>) {
    this.collections = new Map<string, Observable<any[]>>();
    this.collections.set('filters', store.select<any[]>(fromRoot.httpCollectionGetFilters));
    this.collections.set('filterTypes', store.select<any[]>(fromRoot.httpCollectionGetFilterTypes));
    this.collectionSelectors$ = store.select<Set<string>>(fromRoot.httpCollectionGetCollectionSelectors);
  }

  /**Returns Observable of collection if it exist: throws otherwise */
  getCollection(collection: string): Observable<any[]> {
    if(!this.collections.has(collection)){
      throw new Error("Collection Does Not Exist: Http-Collection-Service");
    }
    return this.collections.get(collection);
  }
  /**Returns item matching the passed id, from the passed collection: TODO: relocate so http request may be requested, if needed */
  getItemById(id: string, collection: string): Observable<any> {
    return this.collections.get(collection)
      .map((items)=> {
        return items.filter(item => item['id']===id)[0];
      });
  }
  /**TODO: Remove, these are not needed */
  getCollectionSelectors(): Observable<Set<string>> {
    return this.collectionSelectors$;
  }
}