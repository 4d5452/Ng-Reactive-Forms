import { Action } from '@ngrx/store';

import { type } from '../util';

import * as Collection from '../models/http-collections.models';

/** These actions will be 'caught' by ngrx/effects.  The effects 
 *  will handle all server side api request.
*/
export const ActionTypes = {
  GET_ALL_MAP: type(`[Http-Collection] Get All Map`),
  GET_MAP: type(`[Http-Collection] Get Map`),
  PUT_MAP: type(`[Http-Collection] Put Map`),
  POST_MAP: type(`[Http-Collection] Post Map`),
  DELETE_MAP: type(`[Http-Collection] Delete Map`)
}; // end ActionTypes

export class GetAllMapAction implements Action {
  type = ActionTypes.GET_ALL_MAP;
  constructor(public payload: Collection.GetAllMap) {}
}; // end GetAllAction

export class GetMapAction implements Action {
  type = ActionTypes.GET_MAP;
  constructor(public payload: Collection.GetMap) {}
}; // end GetAction

export class PutMapAction implements Action {
  type = ActionTypes.PUT_MAP;
  constructor(public payload: Collection.PutMap) {}
}; // end PutAction

export class PostMapAction implements Action {
  type = ActionTypes.POST_MAP;
  constructor(public payload: Collection.PostMap) {}
}; // end PostAction

export class DeleteMapAction implements Action {
  type = ActionTypes.DELETE_MAP;
  constructor(public payload: Collection.DeleteMap) {}
}; // end DeleteMapAction


export type Actions
  = GetAllMapAction
  | GetMapAction
  | PutMapAction
  | PostMapAction
  | DeleteMapAction

    /**
   * Find more on this at:
   * https://github.com/ngrx/store
   * &&
   * https://github.com/ngrx/example-app
   */