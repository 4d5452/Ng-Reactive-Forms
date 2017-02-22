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

@Injectable()
export class HttpEffectsService {

  constructor(private action$: Actions, private state$: Store<AppState>, private service: ApiService) {}

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