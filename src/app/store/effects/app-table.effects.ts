import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounce';

import * as fromRoot from '../reducers/index';

import * as HTTP from '../models/http.models';

import * as httpActions from '../actions/http.actions';
import * as actions from '../actions/table.actions';

@Injectable()
export class AppTableEffectsService {

  constructor(private action$: Actions, private store$: Store<fromRoot.State>) {}

  @Effect() removeSelected$: Observable<Action> = this.action$
    .ofType(actions.ActionTypes.REMOVE_SELECTED_ITEM)
    .withLatestFrom(this.store$, (action: Action, store: fromRoot.State) => store.table)// need to really rethink this: effects in general
    .distinctUntilChanged()
    .map((table) => {
      let collection = table.currentCollection;
      let selected = table.selected;
      return [collection, selected];
    })
    .mergeMap((value: any[]) => {
      const _delete: HTTP.Delete = { collection: value[0], id: value[1] }
      return Observable.from([
        new httpActions.DeleteAction(_delete),
        new actions.ClearSelectedAction(null)
      ]);
    })
    .catch((err: Error) => {
      console.log(err);
      return Observable.of();
    })

    @Effect() debounceFilter$: Observable<Action> = this.action$
      .ofType(actions.ActionTypes.SET_FILTER)
      .map((action: actions.SetFilterAction) => action.payload)
      .debounce(() => Observable.timer(250))
      .map((filter: string) => {
        return new actions.SetFilterAfterDebounceAction(filter);
      });
};
/**
 * Get more at:
 * https://github.com/ngrx/effects
 */