import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/from';

import { State as AppState } from '../reducers/index';
import { ApiService } from '../../core/http/api.service';
import * as HTTP from '../models/http.models';
import * as actions from '../actions/http.actions';

import * as collection from '../models/http-collections.models';
import * as collectionActions from '../actions/http-collections.actions';

/**
 * http.effects.ts
 *  Used to call api.service for remote data.  After a successful api call (no error)
 *  build a HTTP.SuccessResponse object with HTTP request object, api response body,
 *  and type of action that was intercepted.  Also, build a collection object that
 *  is dependent upon the initial dispatched action: this object contains the 
 *  initial request object, as well as an data that was returned from the api call.
 *  It's important to note: the server may have returned an empty (or null) _body.  the
 *  _body key holds a wrapper called data which contains the would be returned server data.
 *  I'll outline one method, and hopefully the reset will be understood.  There is alot
 *  of repetition, but I'm not willing to refactor now... 
 */
@Injectable()
export class HttpEffectsService {

  constructor(private action$: Actions, private state$: Store<AppState>, private service: ApiService) {}
  /**
   * @effect getAll$
   *  returns Observable<Action>
   *  begins when action of type GET_ALL is dispatched.  GET_ALL is a string literal
   *    defined in src/app/store/actions/http.actions.ts.  Its expanded form is [Http] Get All.
   *    It is unique within the appliaction.
   *  We expect an HTTP.GetAll payload when this action is called: HTTP.Get is found in 
   *    src/app/store/models/http.models.ts.  HTTP.GetAll is an interface defining a collection key.
   *    This collection key will be used to identify the correct collection to add/update/remove 
   *    server data.
   *  We make a call to the ApiService (this.service) with the ActionTypes corresponding api call.
   *    This returns a Response object.  Merge this output with the request object (req).
   *  Once merged build two objects: one for storing the latest api request/response sequence and
   *    the other for updating our local collection.
   *  successObj: An HTTP.SuccessResponse object.
   *    request: This contiains information regarding the initial request.  For GetAll,
   *      this object contains a collection key.
   *    response: This is the api servers response object.  This object is stripped 
   *      of the _body detail.
   *    action:  This relates to the dispatched action that caused the effect to trigger.
   *  collectionObj: A collection.GetAllMap object
   *    request: This contains information regarding the initial request.  For GetAll,
   *      this object contains a collection key.
   *    data: depending upon the servers reply, this object holds the requested/alterd data,
   *      or null if no data was present.  
   *  Once these objects are created, call two seperate actions.  
   *    actions.RequestSuccessAction(successObj): This dispatches without any further effects being
   *      called.  The reducer for this action is found at src/app/store/reducers/http.reducers.ts.
   *      It is responsible for the latest api request/response sequence.
   *    collectionActions.GetAllMapAction(collectionObj): This dipatches directly 
   *      to the initial actions http-collection mapping.  In this case, GetAllMapAction 
   *      is called.  It will update the local collection with data returned by api server.
   *  The last block (catch) will handle any errors and update http.reducers state accordingly.
   */
  @Effect() getAll$: Observable<Action> = this.action$
    .ofType(actions.ActionTypes.GET_ALL)
    .map((action: actions.GetAllAction) => action.payload)
    .mergeMap((req: HTTP.GetAll) => this.service.getAll(req.collection),
      (req: HTTP.GetAll, res: Response) => {
        const successObj: HTTP.SuccessResponse = {
            request: req,
            response: Object.assign({}, res, {_body: null}), // no need for body object in RequestSuccessAction
            action: actions.ActionTypes.GET_ALL
          }
        const collectionObj: collection.GetAllMap = {
          request: req,
          data: res['_body'] ? res.json().data : null
        }
        return Observable.from([
          new actions.RequestSuccessAction(successObj),
          new collectionActions.GetAllMapAction(collectionObj)
        ]);
      })
      .mergeMap((val) => val)
      .catch((err: Error) => Observable.of(new actions.RequestFailureAction({action: actions.ActionTypes.GET_ALL, error: err})))
  
  @Effect() get$: Observable<Action> = this.action$
    .ofType(actions.ActionTypes.GET)
    .map((action: actions.GetAction) => action.payload)
    .mergeMap((req: HTTP.Get) => this.service.get(req.collection, req.id),
      (req: HTTP.Get, res: Response) => {
        const successObj: HTTP.SuccessResponse = {
            request: req,
            response: Object.assign({}, res, {_body: null}), // no need for body object in RequestSuccessAction
            action: actions.ActionTypes.GET
          }
        const collectionObj: collection.GetMap = {
          request: req,
          data: res['_body'] ? res.json().data : null
        }
        return Observable.from([
          new actions.RequestSuccessAction(successObj),
          new collectionActions.GetMapAction(collectionObj)
        ]);
      })
      .mergeMap((val) => val)
      .catch((err: Error) => Observable.of(new actions.RequestFailureAction({action: actions.ActionTypes.GET, error: err})))

  @Effect() add$: Observable<Action> = this.action$
    .ofType(actions.ActionTypes.POST)
    .map((action: actions.PostAction) => action.payload)
    .mergeMap((req: HTTP.Post) => this.service.add(req.collection, req.body),
      (req: HTTP.Post, res: Response) => {
        const successObj: HTTP.SuccessResponse = {
            request: req,
            response: Object.assign({}, res, {_body: null}), // no need for body object in RequestSuccessAction
            action: actions.ActionTypes.POST
          }
        const collectionObj: collection.PostMap = {
          request: req,
          data: res['_body'] ? res.json().data : null
        }
        return Observable.from([
          new actions.RequestSuccessAction(successObj),
          new collectionActions.PostMapAction(collectionObj)
        ]);
      })
      .mergeMap((val) => val)
      .catch((err: Error) => Observable.of(new actions.RequestFailureAction({action: actions.ActionTypes.POST, error: err})))

  @Effect() remove$: Observable<Action> = this.action$
    .ofType(actions.ActionTypes.DELETE)
    .map((action: actions.DeleteAction) => action.payload)
    .mergeMap((req: HTTP.Delete) => this.service.remove(req.collection, req.id),
      (req: HTTP.Delete, res: Response) => {
        const successObj: HTTP.SuccessResponse = {
            request: req,
            response: Object.assign({}, res, {_body: null}), // no need for body object in RequestSuccessAction
            action: actions.ActionTypes.DELETE
          }
        const collectionObj: collection.DeleteMap = {
          request: req,
          data: res['_body'] ? res.json().data : null
        }
        return Observable.from([
          new actions.RequestSuccessAction(successObj),
          new collectionActions.DeleteMapAction(collectionObj)
        ]);
      })
      .mergeMap((val) => val)
      .catch((err: Error) => Observable.of(new actions.RequestFailureAction({action: actions.ActionTypes.DELETE, error: err})))
  
  @Effect() update$: Observable<Action> = this.action$
    .ofType(actions.ActionTypes.PUT)
    .map((action: actions.PutAction) => action.payload)
    .mergeMap((req: HTTP.Put) => this.service.update(req.collection, req.id, req.body),
      (req: HTTP.Put, res: Response) => {
        const successObj: HTTP.SuccessResponse = {
            request: req,
            response: Object.assign({}, res, {_body: null}), // no need for body object in RequestSuccessAction
            action: actions.ActionTypes.PUT
          }
        const collectionObj: collection.PutMap = {
          request: req,
          data: res['_body'] ? res.json().data : null
        }
        return Observable.from([
          new actions.RequestSuccessAction(successObj),
          new collectionActions.PutMapAction(collectionObj)
        ]);
      })
      .mergeMap((val) => val)
      .catch((err: Error) => Observable.of(new actions.RequestFailureAction({action: actions.ActionTypes.PUT, error: err})))
}; // end HttpEffectsService

/**
 * Get more at:
 * https://github.com/ngrx/effects
 */