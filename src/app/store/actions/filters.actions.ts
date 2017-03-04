import { Action } from '@ngrx/store';

import { type } from '../util';

import {Filter } from '../models/app.models';
import { Position } from '../models/position.models';

export const ActionTypes = {
  SET_SELECTED: type('[Filters] Set Selected'),
  CLEAR_SELECTED: type('[Filters] Clear Selected'),
  REMOVE_SELECTED: type('[Filters] Remove Selected'),
  TOGGLE_VIEW_ADD: type('[Filters] Toggle View Add'),
  UPDATE_VIEW_ADD_POSITION: type('[Filters] Update View Add Position'),
  SET_SELECTED_COLUMN: type('[Filters] Set Selected Column')
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
export class ToggleViewAddAction implements Action {
  type = ActionTypes.TOGGLE_VIEW_ADD;
  constructor(public payload: void) {}
}
export class UpdateViewAddPositionAction implements Action {
  type = ActionTypes.UPDATE_VIEW_ADD_POSITION;
  constructor(public payload: Position) {}
}
export class SetSelectedColumnAction implements Action {
  type = ActionTypes.SET_SELECTED_COLUMN;
  constructor(public payload: string) {}
}

export type Actions
  = SetSelectedAction
  | ClearSelectedAction
  | RemoveSelectedAction
  | ToggleViewAddAction
  | UpdateViewAddPositionAction
  | SetSelectedColumnAction


  /**
   * Find more on this at:
   * https://github.com/ngrx/store
   * &&
   * https://github.com/ngrx/example-app
   */