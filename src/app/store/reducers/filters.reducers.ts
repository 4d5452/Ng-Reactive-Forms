import { Observable } from 'rxjs/Observable';

import { Filter, FilterType }from '../models/app.models';
import { ColumnMetaObject } from '../models/table.models';

import * as actions from '../actions/filters.actions';

export interface State {
  columnMeta: ColumnMetaObject[];
}; // end interface: State

const initialState: State = {
  columnMeta: [
    { column: 'ID', selector: 'id', type: 'string' },
    { column: 'TYPE', selector: 'type', type: 'string' },
    { column: 'CREATED', selector: 'created', type: 'date' },
    { column: 'MODIFIED', selector: 'modified', type: 'date' }
  ]
}; // end: initialState

export function reducer(state = initialState, action: actions.Actions): State {
  switch(action.type) {
    default:
      return state;
  }
}

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