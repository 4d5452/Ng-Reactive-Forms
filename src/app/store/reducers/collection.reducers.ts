import { Observable } from 'rxjs/Observable';

import * as actions from '../actions/collection.actions';
import { MetaObject } from '../models/collection.models';

export interface State {
  collection: any[];
  selectedId: string;
  collectionId: string;
  meta: MetaObject[];
}; // end interface: State

const initialState: State = {
  collection: [],
  collectionId: '',
  selectedId: '',
  meta: [] 
  
}; // end: initialState

export function reducer(state = initialState, action: actions.Actions): State {
  switch(action.type) {
    case(actions.ActionTypes.SET_SELECTED_ITEM_ID): {
      console.log("Set Selected Id");
      return Object.assign({}, state, { selectedId: action.payload });
    }
    case(actions.ActionTypes.SET_COLLECTION): {
      console.log("Set Collection");
      let obj = Object.assign({}, {
        collectionId: action.payload['id'],
        collection: [...action.payload['collection']]
      });
      return Object.assign({}, state, obj);
    }
    case(actions.ActionTypes.SET_COLLECTION_META_DATA): {
      console.log("Set Collection Meta Data");
      return Object.assign({}, state, 
        { collectionId: action.payload['collectionId'] },
        { meta: [...<MetaObject[]>action.payload['meta']] }
      );
    }
    default:
      return state;
  }
}

export const getCollection = (state: State) => state.collection;
export const getSelectedCollectionId = (state: State) => state.collectionId;
export const getSelectedItemId = (state: State) => state.selectedId;
export const getMetaData = (state: State) => state.meta;
/** More information may be found at:
 *  https://github.com/ngrx/store
 *  &&
 *  https://github.com/ngrx/example-app/tree/master/src/app/reducers
 */
