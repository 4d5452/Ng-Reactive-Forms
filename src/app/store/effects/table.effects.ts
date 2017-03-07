import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/debounce';

import * as fromRoot from '../reducers/index';

import * as actions from '../actions/table.actions';

@Injectable()
export class TableEffectsService {

  constructor(private action$: Actions) {}

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