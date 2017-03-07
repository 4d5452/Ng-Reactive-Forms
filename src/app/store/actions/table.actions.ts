import { Action } from '@ngrx/store';

import { type } from '../../shared/util';

import { ColumnMetaObject } from '../models/table.models';

export const ActionTypes = {
  SET_SELECTED_COLUMN: type('[Table] Set Selected Column'),
  SET_FILTER: type('[Table] Set Filter'),
  SET_FILTER_AFTER_DEBOUNCE: type('[Table] Set Filter After Debounce'),
  SET_COLUMNS: type('[Table] Set Columns'),
  SET_SORT_ORDER: type('[Table] Set Sort Order')
}; // end ActionTypes

export class SetSelectedColumnAction implements Action {
  type = ActionTypes.SET_SELECTED_COLUMN;
  constructor(public payload: number) {}
}
export class SetFilterAction implements Action {
  type = ActionTypes.SET_FILTER;
  constructor(public payload: string) {}
}
export class SetFilterAfterDebounceAction implements Action {
  type = ActionTypes.SET_FILTER_AFTER_DEBOUNCE;
  constructor(public payload: string) {}
}
export class SetColumnsAction implements Action {
  type = ActionTypes.SET_COLUMNS;
  constructor(public payload: ColumnMetaObject[]) {}
}
export class SetSortOrderAction implements Action { 
  type = ActionTypes.SET_SORT_ORDER;
  constructor(public payload: string) {}
}

export type Actions
  = SetSelectedColumnAction
  | SetFilterAction
  | SetFilterAfterDebounceAction
  | SetColumnsAction
  | SetSortOrderAction

  /**
   * Find more on this at:
   * https://github.com/ngrx/store
   * &&
   * https://github.com/ngrx/example-app
   */