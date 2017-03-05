import { Action } from '@ngrx/store';

import { type } from '../../shared/util';

import {Filter } from '../models/app.models';

export const ActionTypes = {
  REMOVE_SELECTED: type('[Filters] Remove Selected')
}; // end ActionTypes

export class RemoveSelectedAction implements Action {
  type = ActionTypes.REMOVE_SELECTED;
  constructor(public payload: void) {}
}

export type Actions
  = RemoveSelectedAction


  /**
   * Find more on this at:
   * https://github.com/ngrx/store
   * &&
   * https://github.com/ngrx/example-app
   */