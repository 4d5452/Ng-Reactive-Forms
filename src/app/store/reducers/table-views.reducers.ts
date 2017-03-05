import { Observable } from 'rxjs/Observable';

import * as actions from '../actions/table-views.actions';

import { Position } from '../models/position.models';

export interface State {
  addView: boolean;
  addViewPosition: Position;
}; // end interface: State

const initialState: State = {
  addView: false,
  addViewPosition: {
    left: 10,
    top: 10
  }
}; // end: initialState

export function reducer(state = initialState, action: actions.Actions): State {
  switch(action.type) {
    case actions.ActionTypes.TOGGLE_ADD_VIEW: {
      console.log("Toggle View Add");
      return Object.assign({}, state, { addView: !state.addView });
    }
    case actions.ActionTypes.UPDATE_ADD_VIEW_POSITION: {
      console.log("Update View Add Position");
      return Object.assign({}, state, { addViewPosition: action.payload });
    }
    default:
      return state;
  }
}

export const getAddView = (state: State) => state.addView;
export const getAddViewPosition = (state: State) => state.addViewPosition;

/** More information may be found at:
 *  https://github.com/ngrx/store
 *  &&
 *  https://github.com/ngrx/example-app/tree/master/src/app/reducers
 */