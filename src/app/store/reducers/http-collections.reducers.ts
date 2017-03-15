import { Observable } from 'rxjs/Observable';

import * as HTTP from '../models/http.models'; // Use for typecast when using action.payload.request

import * as actions from '../actions/http-collections.actions';

import * as appCollections from '../models/app.models';
import { MetaObject, Type } from '../models/http-collections.models';

/**
 * Collection state is used to represent remote collection data.  i.e.
 * if a remote server has documents (mongodb) within a collection, then
 * this should reflect that collection.  This state is directly used within the
 * application by components.  The user will interact with the UI based upon data
 * help within these containers.  Only after a successful remote api call will these
 * collection references be updated.  Models in the model directory should 
 * accurately reflect server document structure. TODO: add date created/modified to the
 * update sequence.  This will allow a synchronization between the application
 * and server data.
 */
export interface State {
  filters: appCollections.Filter[];
  filtersMeta: MetaObject[];
  filterTypes: appCollections.FilterType[];
  filterTypesMeta: MetaObject[];
  records: appCollections.CleaningRecord[];
  recordsMeta: MetaObject[];
}; // end interface: State

const initialState: State = {
  filters: [],
  filtersMeta: [
    { header: 'ID', selector: ['id'], type: Type.STRING },
    { header: 'TYPE', selector: ['type'], type: Type.STRING },
    { header: 'CREATED', selector: ['created'], type: Type.DATE },
    { header: 'MODIFIED', selector: ['modified'], type: Type.DATE }
  ],
  filterTypes: [],
  filterTypesMeta: [
    { header: 'UPC', selector: ['id'], type: Type.STRING }
  ],
  records: [],
  recordsMeta: [
    { header: 'ID', selector: ['id'], type: Type.STRING },
    { header: 'FILTER', selector: ['filter'], type: Type.STRING },
    { header: 'METER', selector: ['currentEquipmentMeter'], type: Type.STRING },
    { header: 'PRE CLEAN', selector: ['pre'], type: Type.NUMBER },
    { header: 'POST CLEAN', selector: ['post'], type: Type.NUMBER},
    { header: 'CYCLES', selector: ['cycles'], type: Type.NUMBER },
    { header: 'CREATED', selector: ['created'], type: Type.DATE },
    { header: 'MODIFIED', selector: ['modified'], type: Type.DATE }
  ]
}; // end: initialState

/**
 * HTTP actions are mapped here by the http.effects handler.  Said actions have
 * completed successfully; this does not imply the server has returned us 
 * our expected data.  This reducer has been created for use with the 
 * angular-in-memory-web-api.  Test should be performed prior to using on 
 * other apis'.  
 */
export function reducer(state = initialState, action: actions.Actions): State {
  switch(action.type) {

    /**
     * Replace entire collection with items returned from GET action.  actions 
     * defined in src/app/store/actions ensure we have the appropriate 
     * keys within our payload object.  For instance: GET_ALL_MAP tells us
     * that the action.payload.request object will be of type GET_ALL with 
     * a collection key.  Others may include an 'id' or 'body' key.
     */
    case actions.ActionTypes.GET_ALL_MAP: {
      console.log("GET_ALL_MAP", action.payload);
      let collection = {};
      collection[`${action.payload.request.collection}`] = action.payload.data;
      return Object.assign({}, state, collection);
    }

    /**
     * Replace only the requested item in our collection.  Do so by filtering
     * through the collection identified by 'action.payload.request.collection'
     * for all values not matching the new item returned by the GET actionType.
     * Once filtered, append new item to end of collection.
     */
    case actions.ActionTypes.GET_MAP: {
      console.log("GET_MAP", action.payload);
      let collection = {};
      let tmp = state[`${action.payload.request.collection}`]
        .filter((value: any) => value['id'] !== (<HTTP.Get> action.payload.request).id)
      tmp.push(action.payload.data);

      collection[`${action.payload.request.collection}`] = tmp;
      return Object.assign({}, state, collection);
    }

    /**
     * Add new item to the collection.  If the item already exists on the 
     * server side db, it returns null.  In this case ignore request by 
     * returning current state.  Else, if the object has been created on the remote
     * server, update our collection with the newly created object found at
     * action.payload.data.
     */
    case actions.ActionTypes.POST_MAP: {
      console.log("POST_MAP", action.payload);
      if(action.payload.data === null) { return state; } // item was previously added
      let collection = {};
      let tmp = [...state[`${action.payload.request.collection}`], action.payload.data];
      
      collection[`${action.payload.request.collection}`] = tmp;
      return Object.assign({}, state, collection);
    }

    /**
     * Remove item with id 'action.payload.request.id' from the colleciton.  
     * A type cast is required; this is acceptable because we defined 
     * the action payload to that of DELETE_MAP: this is found at 
     * src/app/store/models/http-colleciton.models.ts
     */
    case actions.ActionTypes.DELETE_MAP: {
      console.log("DELETE_MAP", action.payload);
      let collection = {};
      let tmp = state[`${action.payload.request.collection}`]
        .filter((value: any) => value['id'] !== (<HTTP.Delete> action.payload.request).id)
      
      collection[`${action.payload.request.collection}`] = tmp;
      return Object.assign({}, state, collection);
    }

    /**
     * Create or update an existing object in the collection.  This is one 
     * scenario I would change on my own api.  DROP THE UPSERT.
     * The strange ternary operator is required because we get null on updated
     * from server when it successful updates, and data when we get upsert.
     * This will have to do for now...
     */
    case actions.ActionTypes.PUT_MAP: {
      console.log("PUT_MAP", action.payload);
      let collection = {};
      let tmp = state[`${action.payload.request.collection}`]
        .filter((value: any) => value['id'] !== (<HTTP.Put> action.payload.request).id)
      action.payload.data===null ? tmp.push((<HTTP.Put> action.payload.request).body) : tmp.push(action.payload.data);

      collection[`${action.payload.request.collection}`] = tmp;
      return Object.assign({}, state, collection);
    }
    default:
      return state;
  }
}

export const getFilters = (state: State) => state.filters;
export const getFilterTypes = (state: State) => state.filterTypes;
export const getRecords = (state: State) => state.records;

export const getFiltersMeta = (state: State) => state.filtersMeta;
export const getFilterTypesMeta = (state: State) => state.filterTypesMeta;
export const getRecordsMeta = (state: State) => state.recordsMeta;

/** More information may be found at:
 *  https://github.com/ngrx/store
 *  &&
 *  https://github.com/ngrx/example-app/tree/master/src/app/reducers
 */