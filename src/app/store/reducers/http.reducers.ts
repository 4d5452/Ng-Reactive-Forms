
import * as actions from '../actions/http.actions';

export interface State {
  
}; // end interface: State

const initialState: State = {

}; // end: initialState

export function reducer(state = initialState, action: actions.Actions): State {
  switch(action.type) {
    case actions.ActionTypes.REQUEST_SUCCESS: {
      console.log("REQUEST_SUCCESS", action.payload);
      return state;
    }
    case actions.ActionTypes.REQUEST_FAILURE: {
      console.log("REQUEST_FAILURE", action.payload);
      return state;
    }
    default:
      return state;
  }
}