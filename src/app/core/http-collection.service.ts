import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { MetaObject } from '../store/models/http-collections.models';

import * as fromRoot from '../store/reducers/index';

@Injectable()
export class HttpCollectionService {
  collections: Map<string, Observable<any[]>>;
  collectionMeta: Map<string, Observable<MetaObject[]>>;

  constructor(private store: Store<fromRoot.State>) {
    this.collections = new Map<string, Observable<any[]>>();
    this.collections.set('filters', store.select<any[]>(fromRoot.httpCollectionGetFilters));
    this.collections.set('filterTypes', store.select<any[]>(fromRoot.httpCollectionGetFilterTypes));
    this.collections.set('records', store.select<any[]>(fromRoot.httpCollectionGetRecords));

    this.collectionMeta = new Map<string, Observable<MetaObject[]>>();
    this.collectionMeta.set('filters', store.select<MetaObject[]>(fromRoot.httpCollectionGetFiltersMeta));
    this.collectionMeta.set('filterTypes', store.select<MetaObject[]>(fromRoot.httpCollectionGetFilterTypesMeta));
    this.collectionMeta.set('records', store.select<any[]>(fromRoot.httpCollectionGetRecordsMeta));
  }

  /**Returns Observable of collection if it exist: throws otherwise */
  getCollection(collection: string): Observable<any[]> {
    this.validCollection(collection);
    return this.collections.get(collection);
  }
  /**Returns item matching the passed id, from the passed collection: TODO: relocate so http request may be used, if needed */
  getItemById(id: string, collection: string): Observable<any> {
    return this.collections.get(collection)
      .map((items)=> {
        return items.filter(item => item['id']===id)[0];
      });
  }
  /**Returns collection MetaObject array for the collection*/
  getCollectionMetaData(collection: string): Observable<MetaObject[]> {
    this.validCollection(collection);
    return this.collectionMeta.get(collection);
  }

  getCollectionAndMeta(collectionId: string): Observable<Object> {
    this.validCollection(collectionId);
    return this.collections.get(collectionId)
      .mergeMap((collection) => this.collectionMeta.get(collectionId),
        (collection, meta) => {
          return {
            collection: collection,
            meta: meta
          };
        })
  }

  validCollection(collection: string): void {
    if(!this.collectionMeta.has(collection) || !this.collections.has(collection)){
      throw new Error("Collection Does Not Exist: Http-Collection-Service");
    }
  }
}