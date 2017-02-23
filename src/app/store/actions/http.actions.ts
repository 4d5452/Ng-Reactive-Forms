import { Action } from '@ngrx/store';

import { type } from '../util';

import * as HTTP from '../models/http.models';

export const ActionTypes = {
  GET_ALL: type(`[Http] Get All`),
  GET: type(`[Http] Get`),
  PUT: type(`[Http] Put`),
  POST: type(`[Http] Post`),
  DELETE: type(`[Http] Delete`),
  REQUEST_FAILURE: type(`[Http] Request Failure`),
  REQUEST_SUCCESS: type(`[Http] Request Success`)
}; // end ActionTypes

export class GetAllAction implements Action {
  type = ActionTypes.GET_ALL;
  constructor(public payload: HTTP.GetAll) {}
}; // end GetAllAction

export class GetAction implements Action {
  type = ActionTypes.GET;
  constructor(public payload: HTTP.Get) {}
}; // end GetAction

export class PutAction implements Action {
  type = ActionTypes.PUT;
  constructor(public payload: HTTP.Put) {}
}; // end PutAction

export class PostAction implements Action {
  type = ActionTypes.POST;
  constructor(public payload: HTTP.Post) {}
}; // end PostAction

export class DeleteAction implements Action {
  type = ActionTypes.DELETE;
  constructor(public payload: HTTP.Delete) {}
}; // end DeleteAction

export class RequestFailureAction implements Action {
  type = ActionTypes.REQUEST_FAILURE;
  constructor(public payload: HTTP.FailureResponse) {}
}; // end RequestFailureAction

export class RequestSuccessAction implements Action {
  type = ActionTypes.REQUEST_SUCCESS;
  constructor(public payload: HTTP.SuccessResponse) {}
}

export type Actions
  = GetAllAction
  | GetAction
  | PutAction
  | PostAction
  | DeleteAction
  | RequestFailureAction
  | RequestSuccessAction

  /**
   * Find more on this at:
   * https://github.com/ngrx/store
   * &&
   * https://github.com/ngrx/example-app
   */