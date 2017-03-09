import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../store/reducers/index';

import * as actions from '../store/actions/table.actions';

@Injectable()
export class TableService {
  /**Selected column for fitlering */
  selectedColumn$: Observable<number>;
  /**Set filter */
  filter$: Observable<string>;
  /**SortOrder: ASC/DEC TODO */
  sortOrder$: Observable<string>;

  constructor(private store: Store<fromRoot.State>) {
    this.selectedColumn$ = this.store.select<number>(fromRoot.tableGetSelectedColumn);
    this.filter$ = this.store.select<string>(fromRoot.tableGetFilter);
    this.sortOrder$ = this.store.select<string>(fromRoot.tableGetSortOrder);
  }
  
  /**getter/setter for selectedColumn$ */
  getSelectedColumn(): Observable<number> {
    return this.selectedColumn$;
  }
  setSelectedColumn(column: number): void {
    this.store.dispatch(new actions.SetSelectedColumnAction(column));
  }
  /**getter/setter for filter$ */
  getFilter(): Observable<string> {
    return this.filter$;
  }
  setFilter(filter: string): void {
    this.store.dispatch(new actions.SetFilterAction(filter));
  }
  /**getter/setter for sortOrder$ */
  getSortOrder(): Observable<string> {
    return this.sortOrder$;
  }
  setSortOrder(order: string): void {
    this.store.dispatch(new actions.SetSortOrderAction(order));
  }
}