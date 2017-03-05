import { Observable } from 'rxjs/Observable';

import { Filter, FilterType }from '../models/app.models';

import { TableMetaData } from '../models/table.models';
import { Position } from '../models/position.models';

import * as actions from '../actions/filters.actions';

export interface State {
  selected: string;
  viewAdd: boolean;
  viewAddPosition: Position;
  tableMetaData: TableMetaData;
}; // end interface: State

const initialState: State = {
  selected: '',
  viewAdd: false,
  viewAddPosition: {
    left: 10,
    top: 10
  },
  tableMetaData: {
    columns: [
      { column: 'ID', selector: 'id', type: 'string' },
      { column: 'TYPE', selector: 'type', type: 'string' },
      { column: 'CREATED', selector: 'created', type: 'date' },
      { column: 'MODIFIED', selector: 'modified', type: 'date' }
    ],
    selectedColumn: 0
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
    case actions.ActionTypes.SET_SELECTED_COLUMN: {
      console.log("Set Selected Column", action.payload);
      let tmp = Object.assign({}, state.tableMetaData, { selectedColumn : action.payload });
      return Object.assign({}, state, { tableMetaData: tmp });
    }
    default:
      return state;
  }
}

export const getSelected = (state: State) => state.selected;
export const getViewAdd = (state: State) => state.viewAdd;
export const getViewAddPosition = (state: State) => state.viewAddPosition;
export const getTableMetaData = (state: State) => state.tableMetaData;
/** More information may be found at:
 *  https://github.com/ngrx/store
 *  &&
 *  https://github.com/ngrx/example-app/tree/master/src/app/reducers
 */