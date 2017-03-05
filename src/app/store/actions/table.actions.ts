import { Action } from '@ngrx/store';

import { type } from '../util';

import { ColumnMetaObject, SortOrder } from '../models/table.models';

export const ActionTypes = {
  SET_ITEMS: type('[Table] Set Items'),
  SET_SELECTED: type('[Table] Set Selected'),
  CLEAR_SELECTED: type('[Table] Clear Selected'),
  SET_SELECTED_COLUMN: type('[Table] Set Selected Column'),
  SET_FILTER: type('[Table] Set Filter'),
  SET_COLUMNS: type('[Table] Set Columns'),
  SET_SORT_ORDER: type('[Table] Set Sort Order')
}; // end ActionTypes


export class SetItemsAction implements Action {
  type = ActionTypes.SET_ITEMS;
  constructor(public payload: any[]) {}
}
export class SetSelectedAction implements Action {
  type = ActionTypes.SET_SELECTED;
  constructor(public payload: string) {}
}
export class ClearSelectedAction implements Action {
  type = ActionTypes.CLEAR_SELECTED;
  constructor(public payload: void) {}
}
export class SetSelectedColumnAction implements Action {
  type = ActionTypes.SET_SELECTED_COLUMN;
  constructor(public payload: number) {}
}
export class SetFilterAction implements Action {
  type = ActionTypes.SET_FILTER;
  constructor(public payload: string) {}
}
export class SetColumnsAction implements Action {
  type = ActionTypes.SET_COLUMNS;
  constructor(public payload: ColumnMetaObject[]) {}
}
export class SetSortOrderAction implements Action { 
  type = ActionTypes.SET_SORT_ORDER;
  constructor(public payload: SortOrder) {}
}

export type Actions
  = SetItemsAction
  | SetSelectedAction
  | ClearSelectedAction
  | SetSelectedColumnAction
  | SetFilterAction
  | SetColumnsAction
  | SetSortOrderAction

  /**
   * Find more on this at:
   * https://github.com/ngrx/store
   * &&
   * https://github.com/ngrx/example-app
   */