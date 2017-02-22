import * as actions from '../actions/http.actions';
import * as HTTP from '../models/http.models';

export interface State {
  latest: HTTP.SuccessResponse;
  latestError: HTTP.FailureResponse;
  error: boolean;
}; // end interface: State

const initialState: State = {
  latest: null,
  latestError: null,
  error: false
}; // end: initialState

export function reducer(state = initialState, action: actions.Actions): State {
  switch(action.type) {
    case actions.ActionTypes.REQUEST_SUCCESS: {
      console.log("REQUEST_SUCCESS", action.payload);
      return Object.assign({}, state, {
        latest: action.payload,
        latestError: null,
        error: false
      });
    }
    case actions.ActionTypes.REQUEST_FAILURE: {
      console.log("REQUEST_FAILURE", action.payload);
      return Object.assign({}, state, {
        latest: null,
        latestError: action.payload,
        error: true
      });
    }
    default:
      return state;
  }
}

export const getLatest = (state: State) => state.latest;
export const getLatestError = (state: State) => state.latestError;