import { Observable } from 'rxjs/Observable';

import { Filter }from '../models/app.models';

import * as actions from '../actions/filters.actions';

export interface State {
  selected: string;
}; // end interface: State

const initialState: State = {
  selected: ""
}; // end: initialState

export function reducer(state = initialState, action: actions.Actions): State {
  switch(action.type) {
    case actions.ActionTypes.SET_SELECTED: {
      return Object.assign({}, state, { selected: action.payload });
    }
    case actions.ActionTypes.CLEAR_SELECTED: {
      return Object.assign({}, state, { selected: "" });
    }
    default:
      return state;
  }
}

export const getSelected = (state: State) => state.selected;
/** More information may be found at:
 *  https://github.com/ngrx/store
 *  &&
 *  https://github.com/ngrx/example-app/tree/master/src/app/reducers
 */