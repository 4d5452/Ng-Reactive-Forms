import { Observable } from 'rxjs/Observable';

import * as actions from '../actions/popup.actions';

import { Position } from '../models/position.models';

export interface State {
  popupOpen: boolean;
  popupPosition: Position;
  popupTask: string;
}; // end interface: State

const initialState: State = {
  popupOpen: false,
  popupPosition: {
    left: 10,
    top: 10
  },
  popupTask: ''
}; // end: initialState

export function reducer(state = initialState, action: actions.Actions): State {
  switch(action.type) {
    case actions.ActionTypes.CLOSE_POPUP: {
      console.log("Close Popup");
      return Object.assign({}, state, 
        { popupOpen: false },
        { popupTask: '' }
      );
    }
    case actions.ActionTypes.OPEN_POPUP: {
      console.log("Open Popup");
      return Object.assign({}, state, 
        { popupOpen: true },
        { popupTask: action.payload }
      );
    }
    case actions.ActionTypes.UPDATE_POPUP_POSITION: {
      console.log("Update Popup Position");
      return Object.assign({}, state, { popupPosition: action.payload });
    }
    default:
      return state;
  }
}

export const isPopupOpen = (state: State) => state.popupOpen;
export const getPopupPosition = (state: State) => state.popupPosition;
export const getPopupTask = (state: State) => state.popupTask;
/** More information may be found at:
 *  https://github.com/ngrx/store
 *  &&
 *  https://github.com/ngrx/example-app/tree/master/src/app/reducers
 */