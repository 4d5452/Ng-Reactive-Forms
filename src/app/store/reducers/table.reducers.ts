import { Observable } from 'rxjs/Observable';

import { SortOrder } from '../models/table.models';

import * as actions from '../actions/table.actions';

export interface State {
  selectedColumn: number;
  filter: string;
  order: string;
}; // end interface: State

const initialState: State = {
  selectedColumn: 0,
  filter: '',
  order: SortOrder.ASCENDING
}; // end: initialState

export function reducer(state = initialState, action: actions.Actions): State {
  switch(action.type) {

    case actions.ActionTypes.SET_SELECTED_COLUMN: {
      console.log("Set Selected Column", action.payload);
      return Object.assign({}, state, { selectedColumn: action.payload });
    }
    case actions.ActionTypes.SET_FILTER_AFTER_DEBOUNCE: {
      console.log("Set Filter After Debounce");
      return Object.assign({}, state, { filter: action.payload });
    }
    case actions.ActionTypes.SET_SORT_ORDER: {
      console.log("Set Sort Order");
      return Object.assign({}, state, { order: action.payload });
    }
    default:
      return state;
  }
}

export const getFilter = (state: State) => state.filter;
export const getSelectedColumn = (state: State) => state.selectedColumn;
export const getSortOrder = (state: State) => state.order;
/** More information may be found at:
 *  https://github.com/ngrx/store
 *  &&
 *  https://github.com/ngrx/example-app/tree/master/src/app/reducers
 */