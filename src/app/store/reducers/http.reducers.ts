import * as actions from '../actions/http.actions';
import * as HTTP from '../models/http.models';

/**
 *  For future control of application, temporary storage of last api
 *  request will be stored in this location.  Access this from 
 *  src/app/store/reducers/index using the httpGetState selector.
 *  i.e. this.store.select<fromHttp.State>(httpGetState), where fromHttp.State 
 *  is defined as an import (import * as fromHttp from 'path-to-this-file')
 */
export interface State {
  latest: HTTP.SuccessResponse;
  latestError: HTTP.FailureResponse;
  error: boolean;
}; // end interface: State

/** InitialState when the store is initialized */
const initialState: State = {
  latest: null,
  latestError: null,
  error: false
}; // end: initialState

/** Use this reducers to log the last api request for observers */
export function reducer(state = initialState, action: actions.Actions): State {
  switch(action.type) {
    /** On request success (no server call error occured) update latest with
     *  action.payload.  action.payload is defined to be of type HTTP.SuccessResponse
     *  in src/app/store/actions/http.actions.ts.  Set latestError to null and 
     *  error to false.  This should not be called directly: it is called after
     *  a successful dispatched HTTP action from http.effects.ts. e.g. new actions.PostAction(_post)
     *  where actions is defined as import * as actions from 'path-to-http.actions';
     */
    case actions.ActionTypes.REQUEST_SUCCESS: {
      console.log("REQUEST_SUCCESS", action.payload);
      return Object.assign({}, state, {
        latest: action.payload,
        latestError: null,
        error: false
      });
    }
    /**
     * On request failure (server call error occured) update latestError with
     * action.payload.  action.payload is defined to be of type HTTP.FailureResponse
     * in src/app/store/actions/http.actions.ts.  Set latest to null and error to 
     * true.  This should not be called directly: it is called after a failed 
     * dispatched HTTP action from http.effects.ts.  e.g. new actions.PostAction(_post)
     * where actions is defined as import * as actions from 'path-to-http.actions';
     */
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

// Returns Observable<HTTP.SuccessResponse>
export const getLatest = (state: State) => state.latest;

// Returns Observable<HTTP.FailureResponse>
export const getLatestError = (state: State) => state.latestError;

/** More information may be found at:
 *  https://github.com/ngrx/store
 *  &&
 *  https://github.com/ngrx/example-app/tree/master/src/app/reducers
 */