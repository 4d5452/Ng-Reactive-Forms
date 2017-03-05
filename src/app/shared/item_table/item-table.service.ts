import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../../store/reducers/index';

import { ColumnMetaObject, SortOrder } from '../../store/models/table.models';
import * as tableActions from '../../store/actions/table.actions';

@Injectable()
export class ItemTableService {
  items$: Observable<any[]>;
  selected$: Observable<string>;
  columns$: Observable<ColumnMetaObject[]>;
  selectedColumn$: Observable<number>;
  filter$: Observable<string>;
  order$: Observable<SortOrder>;

  constructor(private store: Store<fromRoot.State>) {
    this.items$ = this.store.select<any[]>(fromRoot.tableGetItems);
    this.selected$ = this.store.select<string>(fromRoot.tableGetSelected);
    this.columns$ = this.store.select<ColumnMetaObject[]>(fromRoot.tableGetColumns);
    this.selectedColumn$ = this.store.select<number>(fromRoot.tableGetSelectedColumn);
    this.filter$ = this.store.select<string>(fromRoot.tableGetFilter);
    this.order$ = this.store.select<SortOrder>(fromRoot.tableGetSortOrder);
  }

  getItems(): Observable<any[]> {
    return this.items$;
  }
  getSelected(): Observable<string> {
    return this.selected$;
  }
  setSelected(selected: string) {
    this.store.dispatch(new tableActions.SetSelectedAction(selected));
  }
  clearSelected(): void {
    this.store.dispatch(new tableActions.ClearSelectedAction(null));
  }
  getColumns(): Observable<ColumnMetaObject[]> {
    return this.columns$;
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
  getSortOrder(): Observable<SortOrder> {
    return this.order$;
  }
  setSortOrder(order: SortOrder): void {
    this.store.dispatch(new tableActions.SetSortOrderAction(order));
  }

}