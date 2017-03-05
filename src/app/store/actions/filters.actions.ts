import { Action } from '@ngrx/store';

import { type } from '../util';

import {Filter } from '../models/app.models';
import { Position } from '../models/position.models';

export const ActionTypes = {
  REMOVE_SELECTED: type('[Filters] Remove Selected'),
  TOGGLE_VIEW_ADD: type('[Filters] Toggle View Add'),
  UPDATE_VIEW_ADD_POSITION: type('[Filters] Update View Add Position')
}; // end ActionTypes

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

export type Actions
  = RemoveSelectedAction
  | ToggleViewAddAction
  | UpdateViewAddPositionAction


  /**
   * Find more on this at:
   * https://github.com/ngrx/store
   * &&
   * https://github.com/ngrx/example-app
   */