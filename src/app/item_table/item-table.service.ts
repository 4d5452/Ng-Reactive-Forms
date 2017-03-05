import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../store/reducers/index';

import { ColumnMetaObject } from '../store/models/table.models';
import * as tableActions from '../store/actions/table.actions';

import { Position } from '../store/models/position.models';
import * as tableViewActions from '../store/actions/table-views.actions';

@Injectable()
export class ItemTableService {
  items$: Observable<any[]>;
  selected$: Observable<string>;
  columns$: Observable<ColumnMetaObject[]>;
  selectedColumn$: Observable<number>;
  filter$: Observable<string>;
  order$: Observable<string>;

  addView$: Observable<boolean>;
  addViewPosition$: Observable<Position>;

  constructor(private store: Store<fromRoot.State>) {
    this.items$ = this.store.select<any[]>(fromRoot.tableGetItems);
    this.selected$ = this.store.select<string>(fromRoot.tableGetSelected);
    this.columns$ = this.store.select<ColumnMetaObject[]>(fromRoot.tableGetColumns);
    this.selectedColumn$ = this.store.select<number>(fromRoot.tableGetSelectedColumn);
    this.filter$ = this.store.select<string>(fromRoot.tableGetFilter);
    this.order$ = this.store.select<string>(fromRoot.tableGetSortOrder);

    this.addView$ = this.store.select<boolean>(fromRoot.tableViewsGetAddView);
    this.addViewPosition$ = this.store.select<Position>(fromRoot.tableViewsGetAddViewPosition);
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
  setFilter(filter: string): void {
    this.store.dispatch(new tableActions.SetFilterAction(filter));
  }
  getSortOrder(): Observable<string> {
    return this.order$;
  }
  setSortOrder(order: string): void {
    this.store.dispatch(new tableActions.SetSortOrderAction(order));
  }

  getAddView(): Observable<boolean> {
    return this.addView$;
  }
  toggleAddView(): void {
    this.store.dispatch(new tableViewActions.ToggleAddViewAction(null));
  }
  getAddViewPosition(): Observable<Position> {
    return this.addViewPosition$;
  }
  updateAddViewPosition(pos: Position): void{
    this.store.dispatch(new tableViewActions.UpdateAddViewPositionAction(pos));
  }

  removeSelectedItem(): void {
    this.store.dispatch(new tableActions.RemoveSelectedItemAction(null));
  }

}