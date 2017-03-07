import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from '../store/reducers/index';

@Injectable()
export class HttpCollectionService {
  filters$: Observable<any[]>;
  collectionSelectors$: Observable<Set<string>>;

  constructor(private store: Store<fromRoot.State>) {
    this.filters$ = store.select<any[]>(fromRoot.httpCollectionGetFilters);
    this.collectionSelectors$ = store.select<Set<string>>(fromRoot.httpCollectionGetCollectionSelectors);
  }

  getCollection(collection: string): Observable<any[]> {
    switch(collection) {
      case('filters'): {
        return this.filters$;
      }
      default: 
        throw new Error("Collection Does Not Exist");
    }
  }
  getCollectionSelectors(): Observable<Set<string>> {
    return this.collectionSelectors$;
  }
}