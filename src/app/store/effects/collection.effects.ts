import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/distinctUntilChanged'

import * as fromRoot from '../reducers/index';

import * as actions from '../actions/collection.actions';

import { HttpCollectionService } from '../../core/http-collection.service';
import { HttpService } from '../../core/http.service';

import * as HTTP from '../models/http.models';
import { MetaObject } from '../models/collection.models';

@Injectable()
export class CollectionEffectsService {

  constructor(private action$: Actions, private store: Store<fromRoot.State>,
    private httpCollectionService: HttpCollectionService, private httpService: HttpService) {}

  @Effect() setCollection$: Observable<Action> = this.action$
    .ofType(actions.ActionTypes.SET_COLLECTION)
    .map((action: actions.SetCollectionAction) => action.payload)
    .switchMap((collection: string)=> {
      return this.httpCollectionService.getCollectionAndMeta(collection)
        .map((data: any) => {
          let fin = Object.assign({}, 
            {id: collection}, {collection: data.collection},
            {meta: data.meta}
          );
          return new actions.SetCollectionCompleteAction(fin);
        })
    });

  @Effect() removeSelected$: Observable<Action> = this.action$
    .ofType(actions.ActionTypes.REMOVE_SELECTED_ITEM)
    .withLatestFrom(this.store, (action, state) => state.collection)
    .distinctUntilChanged()
    .map((collection) => {
      let args: HTTP.Delete = {
        collection: collection.collectionId,
        id: collection.selectedId
      }
      this.httpService.delete(args);
      return new actions.SetSelectedItemIdAction('');
    })
};
/**
 * Get more at:
 * https://github.com/ngrx/effects
 */