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
      return Object.assign({}, state, {
        
      });
    }
    case actions.ActionTypes.GET_MAP: {
      console.log("GET_MAP", action.payload);
      return Object.assign({}, state, {});
    }
    case actions.ActionTypes.POST_MAP: {
      console.log("POST_MAP", action.payload);
      return Object.assign({}, state, {});
    }
    case actions.ActionTypes.DELETE_MAP: {
      console.log("DELETE_MAP", action.payload);
      return Object.assign({}, state, {});
    }
    case actions.ActionTypes.PUT_MAP: {
      console.log("PUT_MAP", action.payload);
      return Object.assign({}, state, {});
    }
    default:
      return state;
  }
}