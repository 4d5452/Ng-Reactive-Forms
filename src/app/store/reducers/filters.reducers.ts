import { Observable } from 'rxjs/Observable';

import { Filter }from '../models/app.models';
import { Position } from '../models/position.models';

import * as actions from '../actions/filters.actions';

export interface State {
  selected: string;
  viewAdd: boolean;
  viewAddPosition: Position;
}; // end interface: State

const initialState: State = {
  selected: '',
  viewAdd: false,
  viewAddPosition: {
    left: 10,
    top: 10
  }
}; // end: initialState

export function reducer(state = initialState, action: actions.Actions): State {
  switch(action.type) {
    case actions.ActionTypes.SET_SELECTED: {
      console.log("Set Selected", action.payload);
      return Object.assign({}, state, { selected: action.payload });
    }
    case actions.ActionTypes.CLEAR_SELECTED: {
      console.log("Clear Selected", state.selected);
      return Object.assign({}, state, { selected: '' });
    }
    case actions.ActionTypes.TOGGLE_VIEW_ADD: {
      console.log("Toggle View Add");
      return Object.assign({}, state, { viewAdd: !state.viewAdd });
    }
    case actions.ActionTypes.UPDATE_VIEW_ADD_POSITION: {
      console.log("Update View Add Position");
      return Object.assign({}, state, { viewAddPosition: action.payload });
    }
    default:
      return state;
  }
}

export const getSelected = (state: State) => state.selected;
export const getViewAdd = (state: State) => state.viewAdd;
export const getViewAddPosition = (state: State) => state.viewAddPosition;
/** More information may be found at:
 *  https://github.com/ngrx/store
 *  &&
 *  https://github.com/ngrx/example-app/tree/master/src/app/reducers
 */