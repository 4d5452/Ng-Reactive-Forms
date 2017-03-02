import { Action } from '@ngrx/store';

import { type } from '../util';

import {Filter } from '../models/app.models';

export const ActionTypes = {
  SET_SELECTED: type('[Filters] Set Selected'),
  CLEAR_SELECTED: type('[Filters] Clear Selected'),
  REMOVE_SELECTED: type('[Filters] Remove Selected')
}; // end ActionTypes

export class SetSelectedAction implements Action {
  type = ActionTypes.SET_SELECTED;
  constructor(public payload: string) {}
}
export class ClearSelectedAction implements Action {
  type = ActionTypes.CLEAR_SELECTED;
  constructor(public payload: void) {}
}
export class RemoveSelectedAction implements Action {
  type = ActionTypes.REMOVE_SELECTED;
  constructor(public payload: void) {}
}

export type Actions
  = SetSelectedAction
  | ClearSelectedAction
  | RemoveSelectedAction


  /**
   * Find more on this at:
   * https://github.com/ngrx/store
   * &&
   * https://github.com/ngrx/example-app
   */