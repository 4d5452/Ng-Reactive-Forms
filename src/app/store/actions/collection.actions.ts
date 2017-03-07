import { Action } from '@ngrx/store';

import { type } from '../../shared/util';

import { MetaObject } from '../models/collection.models';

export const ActionTypes = {
  SET_SELECTED_ITEM_ID: type('[Collection] Set Selected Item Id'),
  SET_COLLECTION: type('[Collection] Set Collection'),
  REMOVE_SELECTED_ITEM: type('[Collection] Remove Selected Item'),
  SET_COLLECTION_META_DATA: type('[Collection] Set Collection Meta Data')
}; // end ActionTypes

export class SetSelectedItemIdAction implements Action {
  type = ActionTypes.SET_SELECTED_ITEM_ID;
  constructor(public payload: string) {} //Might need to change one... fine for now
}
export class SetCollectionAction implements Action {
  type = ActionTypes.SET_COLLECTION;
  constructor(public payload: {id: string, collection: any[]}) {}
}
export class RemoveSelectedItemAction implements Action {
  type = ActionTypes.REMOVE_SELECTED_ITEM;
  constructor(public payload: void) {}
}
export class SetCollectionMetaDataAction implements Action {
  type = ActionTypes.SET_COLLECTION_META_DATA;
  constructor(public payload: {collection: string, meta: MetaObject[]}) {}
}

export type Actions
  = SetSelectedItemIdAction
  | SetCollectionAction
  | RemoveSelectedItemAction
  | SetCollectionMetaDataAction