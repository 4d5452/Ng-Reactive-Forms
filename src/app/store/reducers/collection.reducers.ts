import { Observable } from 'rxjs/Observable';

import * as actions from '../actions/collection.actions';

export interface State {
  selectedId: string;
  collectionId: string;
  collection: any[];
  
}; // end interface: State

const initialState: State = {
  collectionId: '',
  selectedId: '',
  collection: []
}; // end: initialState

export function reducer(state = initialState, action: actions.Actions): State {
  switch(action.type) {
    case(actions.ActionTypes.SET_SELECTED_ITEM_ID): {
      console.log("Set Selected Id");
      return Object.assign({}, state, { selected: action.payload });
    }
    case(actions.ActionTypes.SET_COLLECTION): {
      console.log("Set Collection");
      let obj = Object.assign({}, {
        collectionId: action.payload['id'],
        collection: [...action.payload['collection']]
      });
      return Object.assign({}, state, obj);
    }
    default:
      return state;
  }
}

export const getSelectedCollectionId = (state: State) => state.collectionId;
export const getSelectedItemId = (state: State) => state.selectedId;
export const getCollection = (state: State) => state.collection;
/** More information may be found at:
 *  https://github.com/ngrx/store
 *  &&
 *  https://github.com/ngrx/example-app/tree/master/src/app/reducers
 */

