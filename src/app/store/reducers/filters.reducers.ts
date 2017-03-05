import { Observable } from 'rxjs/Observable';

import { Filter, FilterType }from '../models/app.models';
import { ColumnMetaObject } from '../models/table.models';
import { Position } from '../models/position.models';

import * as actions from '../actions/filters.actions';

export interface State {
  viewAdd: boolean;
  viewAddPosition: Position;
  columnMeta: ColumnMetaObject[];
}; // end interface: State

const initialState: State = {
  viewAdd: false,
  viewAddPosition: {
    left: 10,
    top: 10
  },
  columnMeta: [
    { column: 'ID', selector: 'id', type: 'string' },
    { column: 'TYPE', selector: 'type', type: 'string' },
    { column: 'CREATED', selector: 'created', type: 'date' },
    { column: 'MODIFIED', selector: 'modified', type: 'date' }
  ]
}; // end: initialState

export function reducer(state = initialState, action: actions.Actions): State {
  switch(action.type) {
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

export const getViewAdd = (state: State) => state.viewAdd;
export const getViewAddPosition = (state: State) => state.viewAddPosition;
export const getColumnMetaObjectArray = (state: State) => state.columnMeta;
/** More information may be found at:
 *  https://github.com/ngrx/store
 *  &&
 *  https://github.com/ngrx/example-app/tree/master/src/app/reducers
 */

/**
 * tableMetaData: {
    columns: [
      { column: 'ID', selector: 'id', type: 'string' },
      { column: 'TYPE', selector: 'type', type: 'string' },
      { column: 'CREATED', selector: 'created', type: 'date' },
      { column: 'MODIFIED', selector: 'modified', type: 'date' }
    ]
  }
 */