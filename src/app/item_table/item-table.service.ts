import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../store/reducers/index';

import * as tableActions from '../store/actions/table.actions';

@Injectable()
export class ItemTableService {
  selectedColumn$: Observable<number>;
  filter$: Observable<string>;
  order$: Observable<string>;

  constructor(private store: Store<fromRoot.State>) {
    this.selectedColumn$ = this.store.select<number>(fromRoot.tableGetSelectedColumn);
    this.filter$ = this.store.select<string>(fromRoot.tableGetFilter);
    this.order$ = this.store.select<string>(fromRoot.tableGetSortOrder);
  }
  
  getSelectedColumn(): Observable<number> {
    return this.selectedColumn$;
  }
  setSelectedColumn(column: number): void {
    this.store.dispatch(new tableActions.SetSelectedColumnAction(column));
  }
  getFilter(): Observable<string> {
    return this.filter$;
  }
  setFilter(filter: string): void {
    this.store.dispatch(new tableActions.SetFilterAction(filter));
  }
  getSortOrder(): Observable<string> {
    return this.order$;
  }
  setSortOrder(order: string): void {
    this.store.dispatch(new tableActions.SetSortOrderAction(order));
  }
}