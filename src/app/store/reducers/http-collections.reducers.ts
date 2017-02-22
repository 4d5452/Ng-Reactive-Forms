import { Observable } from 'rxjs/Observable';

import * as HTTP from '../models/http.models';
import * as actions from '../actions/http-collections.actions';
import { Item } from '../models/items.models';

export interface State {
  items: Item[];
}; // end interface: State

const initialState: State = {
  items: []
}; // end: initialState

export function reducer(state = initialState, action: actions.Actions): State {
  switch(action.type) {
    case actions.ActionTypes.GET_ALL_MAP: {
      console.log("GET_ALL_MAP", action.payload);
      let collection = {};
      collection[`${action.payload.request.collection}`] = action.payload.data;
      return Object.assign({}, state, collection);
    }
    case actions.ActionTypes.GET_MAP: {
      console.log("GET_MAP", action.payload);
      let collection = {};
      let tmp = state[`${action.payload.request.collection}`]
        .filter((value: any) => value['id'] !== (<HTTP.Get> action.payload.request).id)
      tmp.push(action.payload.data);

      collection[`${action.payload.request.collection}`] = tmp;
      return Object.assign({}, state, collection);
    }
    case actions.ActionTypes.POST_MAP: {
      console.log("POST_MAP", action.payload);
      if(action.payload.data === null) { return state; } // item was previously added
      let collection = {};
      let tmp = [...state[`${action.payload.request.collection}`], action.payload.data];
      
      collection[`${action.payload.request.collection}`] = tmp;
      return Object.assign({}, state, collection);
    }
    case actions.ActionTypes.DELETE_MAP: {
      console.log("DELETE_MAP", action.payload);
      let collection = {};
      let tmp = state[`${action.payload.request.collection}`]
        .filter((value: any) => value['id'] !== (<HTTP.Delete> action.payload.request).id)
      
      collection[`${action.payload.request.collection}`] = tmp;
      return Object.assign({}, state, collection);
    }
    case actions.ActionTypes.PUT_MAP: {
      console.log("PUT_MAP", action.payload);
      if(action.payload.data === null) { return state; } // replace item: upsert will occur
      let collection = {};
      let tmp = state[`${action.payload.request.collection}`]
        .filter((value: any) => value['id'] !== (<HTTP.Put> action.payload.request).id)
      tmp.push(action.payload.data);

      collection[`${action.payload.request.collection}`] = tmp;
      return Object.assign({}, state, collection);
    }
    default:
      return state;
  }
}

export const getCollectionItems = (state: State) => state.items;