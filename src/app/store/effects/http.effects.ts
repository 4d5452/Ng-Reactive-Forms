import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';

import { State as AppState } from '../reducers/index';
import { ApiService } from '../../core/http/api.service';
import * as HTTP from '../models/http.models';
import * as actions from '../actions/http.actions';

@Injectable()
export class HttpEffectsService {

  constructor(private action$: Actions, private state$: Store<AppState>, private service: ApiService) {}

  @Effect() getAll$: Observable<Action> = this.action$
    .ofType(actions.ActionTypes.GET_ALL)
    .map((action: actions.GetAllAction) => action.payload)
    .mergeMap((req: HTTP.GetAll) => {
      console.log("getAll$ Effect");
      return this.service.getAll(req.collection)
        .map((res: Response) => new actions.RequestSuccessAction({request: req, response: res, action: actions.ActionTypes.GET_ALL}))
        .catch((err: Error) => Observable.of(new actions.RequestFailureAction({action: actions.ActionTypes.GET_ALL, error: err})));
    });
  
  @Effect() get$: Observable<Action> = this.action$
    .ofType(actions.ActionTypes.GET)
    .map((action: actions.GetAction) => action.payload)
    .mergeMap((req: HTTP.Get) => {
      console.log("get$ Effect");
      return this.service.get(req.collection, req.id)
        .map((res: Response) => new actions.RequestSuccessAction({request: req, response: res, action: actions.ActionTypes.GET}))
        .catch((err: Error) => Observable.of(new actions.RequestFailureAction({action: actions.ActionTypes.GET, error: err})));
    });

  @Effect() add$: Observable<Action> = this.action$
    .ofType(actions.ActionTypes.POST)
    .map((action: actions.PostAction) => action.payload)
    .mergeMap((req: HTTP.Post) => {
      console.log("add$ Effect");
      return this.service.add(req.collection, req.body)
        .map((res: Response) => new actions.RequestSuccessAction({request: req, response: res, action: actions.ActionTypes.POST}))
        .catch((err: Error) => Observable.of(new actions.RequestFailureAction({action: actions.ActionTypes.POST, error: err})));
    });

  @Effect() remove$: Observable<Action> = this.action$
    .ofType(actions.ActionTypes.DELETE)
    .map((action: actions.DeleteAction) => action.payload)
    .mergeMap((req: HTTP.Delete) => {
      console.log("remove$ Effect");
      return this.service.remove(req.collection, req.id)
        .map((res: Response) => new actions.RequestSuccessAction({request: req, response: res, action: actions.ActionTypes.DELETE}))
        .catch((err: Error) => Observable.of(new actions.RequestFailureAction({action: actions.ActionTypes.DELETE, error: err})));
    });
  
  @Effect() update$: Observable<Action> = this.action$
    .ofType(actions.ActionTypes.PUT)
    .map((action: actions.PutAction) => action.payload)
    .mergeMap((req: HTTP.Put) => {
      console.log("update$ Effect");
      return this.service.update(req.collection, req.id, req.body)
        .map((res: Response) => new actions.RequestSuccessAction({request: req, response: res, action: actions.ActionTypes.PUT}))
        .catch((err: Error) => Observable.of(new actions.RequestFailureAction({action: actions.ActionTypes.PUT, error: err})));
    });
}; // end HttpEffectsService