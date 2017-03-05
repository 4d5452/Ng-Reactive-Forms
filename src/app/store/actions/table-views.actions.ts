import { Action } from '@ngrx/store';

import { type } from '../../shared/util';

import { Position } from '../models/position.models';

export const ActionTypes = {
  TOGGLE_ADD_VIEW: type('[Table Views] Toggle Add View'),
  UPDATE_ADD_VIEW_POSITION: type('[Table Views] Update Add View Position')
}; // end ActionTypes

export class ToggleAddViewAction implements Action {
  type = ActionTypes.TOGGLE_ADD_VIEW;
  constructor(public payload: void) {}
}
export class UpdateAddViewPositionAction implements Action {
  type = ActionTypes.UPDATE_ADD_VIEW_POSITION;
  constructor(public payload: Position) {}
}

export type Actions
  = ToggleAddViewAction
  | UpdateAddViewPositionAction

  /**
   * Find more on this at:
   * https://github.com/ngrx/store
   * &&
   * https://github.com/ngrx/example-app
   */