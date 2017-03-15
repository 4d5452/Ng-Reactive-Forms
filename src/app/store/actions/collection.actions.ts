import { Action } from '@ngrx/store';

import { type } from '../../shared/util';

import { MetaObject } from '../models/collection.models';

export const ActionTypes = {
  SET_SELECTED_ITEM_ID: type('[Collection] Set Selected Item Id'),
  SET_COLLECTION: type('[Collection] Set Collection'),
  SET_COLLECTION_COMPLETE: type('[Collection] Set Collection Complete'),
  REMOVE_SELECTED_ITEM: type('[Collection] Remove Selected Item')
}; // end ActionTypes

export class SetSelectedItemIdAction implements Action {
  type = ActionTypes.SET_SELECTED_ITEM_ID;
  constructor(public payload: string) {} //Might need to change one... fine for now
}
export class SetCollectionAction implements Action {
  type = ActionTypes.SET_COLLECTION;
  constructor(public payload: string) {}
}
export class SetCollectionCompleteAction implements Action {
  type = ActionTypes.SET_COLLECTION_COMPLETE;
  constructor(public payload: {id: string, collection: any[], meta: MetaObject[]}) {}
}
export class RemoveSelectedItemAction implements Action {
  type = ActionTypes.REMOVE_SELECTED_ITEM;
  constructor(public payload: void) {}
}

export type Actions
  = SetSelectedItemIdAction
  | SetCollectionAction
  | SetCollectionCompleteAction
  | RemoveSelectedItemAction