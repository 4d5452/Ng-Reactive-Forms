import { createSelector } from 'reselect';
import { ActionReducer } from '@ngrx/store';

/**
 * The compose function is one of our most handy tools. In basic terms, you give
 * it any number of functions and it returns a function. This new function
 * takes a value and chains it through every composed function, returning
 * the output.
 *
 * More: https://drboolean.gitbooks.io/mostly-adequate-guide/content/ch5.html
 */
import { compose } from '@ngrx/core';

/**
 * storeFreeze prevents state from being mutated. When mutation occurs, an
 * exception will be thrown. This is useful during development mode to
 * ensure that none of the reducers accidentally mutates the state.
 */
import { storeFreeze } from 'ngrx-store-freeze';

/**
 * combineReducers is another useful metareducer that takes a map of reducer
 * functions and creates a new reducer that stores the gathers the values
 * of each reducer and stores them using the reducer's key. Think of it
 * almost like a database, where every reducer is a table in the db.
 *
 * More: https://egghead.io/lessons/javascript-redux-implementing-combinereducers-from-scratch
 */
import { combineReducers } from '@ngrx/store';

/**
 * Every reducer module's default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */
import * as fromHttp from './http.reducers';
import * as fromHttpCollection from './http-collections.reducers';
import * as fromTable from './table.reducers';
import * as fromPopup from './popup.reducers';
import * as fromCollection from './collection.reducers';
import * as fromRouter from '@ngrx/router-store';

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface State {
  http: fromHttp.State;
  httpCollection: fromHttpCollection.State;
  table: fromTable.State;
  popup: fromPopup.State;
  collection: fromCollection.State;
  router: fromRouter.RouterState;
}

/**
 * Because metareducers take a reducer function and return a new reducer,
 * we can use our compose helper to chain them together. Here we are
 * using combineReducers to make our top level reducer, and then
 * wrapping that in storeLogger. Remember that compose applies
 * the result from right to left.
 */
const reducers = {
  http: fromHttp.reducer,
  httpCollection: fromHttpCollection.reducer,
  table: fromTable.reducer,
  popup: fromPopup.reducer,
  collection: fromCollection.reducer,
  router: fromRouter.routerReducer
};


const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
export function reducer(state: any, action: any) {
  return developmentReducer(state, action);
}
/**------------------------------------------------------------------------------------------------------------------- */
/** TODO: Modify when envrionment variables can be set and maintained */
//const productionReducer: ActionReducer<State> = combineReducers(reducers);

/*export function reducer(state: any, action: any) {
  if (environment.production) {
    return productionReducer(state, action);
  }
  else {
    return developmentReducer(state, action);
  }
}*/
/**------------------------------------------------------------------------------------------------------------------- */

export const httpGetState = (state: State) => state.http;
export const httpGetLatest = createSelector(httpGetState, fromHttp.getLatest);
export const httpGetLatestError = createSelector(httpGetState, fromHttp.getLatestError);

export const httpCollectionGetState = (state: State) => state.httpCollection;
export const httpCollectionGetFilters = createSelector(httpCollectionGetState, fromHttpCollection.getFilters);
export const httpCollectionGetFilterTypes = createSelector(httpCollectionGetState, fromHttpCollection.getFilterTypes);
export const httpCollectionGetFiltersMeta = createSelector(httpCollectionGetState, fromHttpCollection.getFiltersMeta);
export const httpCollectionGetFilterTypesMeta = createSelector(httpCollectionGetState, fromHttpCollection.getFilterTypesMeta);
export const httpCollectionGetRecords = createSelector(httpCollectionGetState, fromHttpCollection.getRecords);
export const httpCollectionGetRecordsMeta = createSelector(httpCollectionGetState, fromHttpCollection.getRecordsMeta);
export const httpCollectionGetEquipment = createSelector(httpCollectionGetState, fromHttpCollection.getEquipment);
export const httpCollectionGetEquipmentMeta = createSelector(httpCollectionGetState, fromHttpCollection.getEquipmentMeta);
export const httpCollectionGetAssignments = createSelector(httpCollectionGetState, fromHttpCollection.getAssignments);
export const httpCollectionGetAssignmentsMeta = createSelector(httpCollectionGetState, fromHttpCollection.getAssignmentsMeta);

export const tableGetState = (state: State) => state.table;
export const tableGetFilter = createSelector(tableGetState, fromTable.getFilter);
export const tableGetSelectedColumn = createSelector(tableGetState, fromTable.getSelectedColumn);
export const tableGetSortOrder = createSelector(tableGetState, fromTable.getSortOrder);

export const popupGetState = (state: State) => state.popup;
export const popupIsOpen = createSelector(popupGetState, fromPopup.isPopupOpen);
export const popupGetPosition = createSelector(popupGetState, fromPopup.getPopupPosition);
export const popupGetTask = createSelector(popupGetState, fromPopup.getPopupTask);

export const collectionGetState = (state: State) => state.collection;
export const collectionGetSelectedCollectionId = createSelector(collectionGetState, fromCollection.getSelectedCollectionId);
export const collectionGetSelectedId = createSelector(collectionGetState, fromCollection.getSelectedItemId);
export const collectionGetCollection = createSelector(collectionGetState, fromCollection.getCollection);
export const collectionGetMetaData = createSelector(collectionGetState, fromCollection.getMetaData);

/**The source of this file may be found at:
 *  https://github.com/ngrx/example-app/blob/master/src/app/reducers/index.ts
 */