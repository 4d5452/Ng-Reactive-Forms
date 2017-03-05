import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/distinctUntilChanged';

import { State as AppState } from '../reducers/index';

import * as httpActions from '../actions/http.actions';
import * as tableActions from '../actions/table.actions';
import * as actions from '../actions/filters.actions';

@Injectable()
export class FiltersEffectsService {

  constructor(private action$: Actions, private state$: Store<AppState>) {}

  @Effect() removeSelected$: Observable<Action> = this.action$
    .ofType(actions.ActionTypes.REMOVE_SELECTED)
    .map((action: actions.RemoveSelectedAction) => action)
    .withLatestFrom(this.state$, (action: Action, state: AppState) => state.table.selected)
    .distinctUntilChanged()
    .map((selected: string) => { 
        return Observable.from([
          new httpActions.DeleteAction({collection: 'filters', id: selected}),
          new tableActions.ClearSelectedAction(null)
        ]);
      })
      .mergeMap((val) => val)
      .catch((err: Error) => Observable.of())

};

/**
 * Get more at:
 * https://github.com/ngrx/effects
 */