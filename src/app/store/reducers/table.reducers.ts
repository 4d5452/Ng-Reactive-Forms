import { Observable } from 'rxjs/Observable';

import { ColumnMetaObject, SortOrder } from '../models/table.models';

import * as actions from '../actions/table.actions';

export interface State {
  items: any[];
  selected: string;
  columns: ColumnMetaObject[];
  selectedColumn: number;
  filter: string;
  order: SortOrder;
  currentCollection: string;
}; // end interface: State

const initialState: State = {
  items: [],
  selected: '',
  columns: [],
  selectedColumn: 0,
  filter: '',
  order: SortOrder.ASC,
  currentCollection: ''
}; // end: initialState

export function reducer(state = initialState, action: actions.Actions): State {
  switch(action.type) {
    case actions.ActionTypes.SET_ITEMS: {
      console.log("Set Items", action.payload);
      return Object.assign({}, state, { items: [...<any[]> action.payload] });
    }
    case actions.ActionTypes.SET_SELECTED: {
      console.log("Set Selected", action.payload);
      return Object.assign({}, state, { selected: action.payload });
    }
    case actions.ActionTypes.CLEAR_SELECTED: {
      console.log("Clear Selected", state.selected);
      return Object.assign({}, state, { selected: '' });
    }
    case actions.ActionTypes.SET_SELECTED_COLUMN: {
      console.log("Set Selected Column", action.payload);
      return Object.assign({}, state, { selectedColumn: action.payload });
    }
    case actions.ActionTypes.SET_FILTER_AFTER_DEBOUNCE: {
      console.log("Set Filter After Debounce");
      return Object.assign({}, state, { filter: action.payload });
    }
    case actions.ActionTypes.SET_COLUMNS: {
      console.log("Set Columns", action.payload);
      return Object.assign({}, state, { columns: action.payload });
    }
    case actions.ActionTypes.SET_SORT_ORDER: {
      console.log("Set Sort Order");
      return Object.assign({}, state, { order: action.payload });
    }

    case actions.ActionTypes.SET_CURRENT_COLLECTION: {
      console.log("Set Current Collection");
      return Object.assign({}, state, { currentCollection: action.payload });
    }
    default:
      return state;
  }
}

export const getItems = (state: State) => state.items;
export const getSelected = (state: State) => state.selected;
export const getFilter = (state: State) => state.filter;
export const getColumns = (state: State) => state.columns;
export const getSelectedColumn = (state: State) => state.selectedColumn;
export const getSortOrder = (state: State) => state.order;

export const getCurrentCollection = (state: State) => state.currentCollection;
/** More information may be found at:
 *  https://github.com/ngrx/store
 *  &&
 *  https://github.com/ngrx/example-app/tree/master/src/app/reducers
 */