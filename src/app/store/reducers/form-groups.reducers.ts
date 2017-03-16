import { Observable } from 'rxjs/Observable';
import { FormGroup } from '@angular/forms';

import * as actions from '../actions/form-groups.actions';

export interface State {
  filters: FormGroup;
}; // end interface: State

const initialState: State = {
  filters: null
}; // end: initialState

export function reducer(state = initialState, action: actions.Actions): State {
  switch(action.type) {
    case actions.ActionTypes.ADD_FORM_GROUP: {
      let obj = {};
      obj[`${action.payload.collection}`] = action.payload.formGroup;
      console.log("Add Form Group", obj);
      return Object.assign({}, state, obj);
    }
    default:
      return state;
  }
}

export const getFilterGroup = (state: State) => state.filters;
/** More information may be found at:
 *  https://github.com/ngrx/store
 *  &&
 *  https://github.com/ngrx/example-app/tree/master/src/app/reducers
 */