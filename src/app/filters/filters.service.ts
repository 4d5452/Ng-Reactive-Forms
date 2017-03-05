import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription'
import { Store } from '@ngrx/store';

import * as fromRoot from '../store/reducers/index';

import { Filter } from '../store/models/app.models'; // copy and paste from item service...
import * as filterActions from '../store/actions/filters.actions';

import { ColumnMetaObject } from '../store/models/table.models';
import * as tableActions from '../store/actions/table.actions';

@Injectable()
export class FiltersService {
  /**Tmp fix for leak */
  filters$: Observable<Filter[]>;
  filter: Subscription;


  constructor(private store: Store<fromRoot.State>) {}

  configTable(): void {
    /**Serious potential for memory leak */
    this.filters$ = this.store.select<Filter[]>(fromRoot.httpCollectionGetFilters);
    this.filter = this.filters$.subscribe((filters: Filter[]) => { 
        this.store.dispatch(new tableActions.SetItemsAction(filters));
       });
    this.store.select<ColumnMetaObject[]>(fromRoot.filtersGetColumnMetaObjectArray)
      .subscribe((meta: ColumnMetaObject[]) => { 
        this.store.dispatch(new tableActions.SetColumnsAction(meta));
      }).unsubscribe();
    this.store.dispatch(new tableActions.SetCurrentCollectionAction('filters'));
  }

  destroy(): void {
    this.filter.unsubscribe();
  }
}