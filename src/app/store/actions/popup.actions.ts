import { Action } from '@ngrx/store';

import { type } from '../../shared/util';

import { Position } from '../models/position.models';

export const ActionTypes = {
  CLOSE_POPUP: type('[Popup] Close Popup'),
  OPEN_POPUP: type('[Popup] Open Popup'),
  UPDATE_POPUP_POSITION: type ('[Popup] Update Popup Position')
}; // end ActionTypes

export class ClosePopupAction implements Action {
  type = ActionTypes.CLOSE_POPUP;
  constructor(public payload: void) {}
}
export class OpenPopupAction implements Action {
  type = ActionTypes.OPEN_POPUP;
  constructor(public payload: string) {}
}
export class UpdatePopupPosition implements Action {
  type = ActionTypes.UPDATE_POPUP_POSITION;
  constructor(public payload: Position) {}
}

export type Actions
  = ClosePopupAction
  | OpenPopupAction
  | UpdatePopupPosition
