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
import * as actions from '../actions/table.actions';

@Injectable()
export class AppTableEffectsService {

  constructor(private action$: Actions, private state$: Store<AppState>) {}

  @Effect() removeSelected$: Observable<Action> = this.action$
    .ofType(actions.ActionTypes.REMOVE_SELECTED_ITEM)
    .map((action: actions.RemoveSelectedItemAction) => action)
    .withLatestFrom(this.state$, (action: Action, state: AppState) => state.table.selected)
    .distinctUntilChanged()
    .map((selected: string) => { 
        return Observable.from([
          new httpActions.DeleteAction({collection: 'filters', id: selected}),
          new actions.ClearSelectedAction(null)
        ]);
      })
      .mergeMap((val) => val)
      .catch((err: Error) => Observable.of())

};

/**
 * Get more at:
 * https://github.com/ngrx/effects
 */