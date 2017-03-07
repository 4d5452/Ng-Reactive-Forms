import { Action } from '@ngrx/store';

import { type } from '../../shared/util';

export const ActionTypes = {
  SET_SELECTED_COLLECTION_ID: type('[Collection] Set Selected Collection Id'),
  SET_SELECTED_ITEM_ID: type('[Collection] Set Selected Item Id'),
  SET_COLLECTION: type('[Collection] Set Collection'),
  REMOVE_SELECTED_ITEM: type('[Collection] Remove Selected Item')
}; // end ActionTypes

export class SetSelectedCollectionIdAction implements Action {
  type = ActionTypes.SET_SELECTED_COLLECTION_ID;
  constructor(public payload: string) {}
}
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

export type Actions
  = SetSelectedCollectionIdAction
  | SetSelectedItemIdAction
  | SetCollectionAction
  | RemoveSelectedItemAction