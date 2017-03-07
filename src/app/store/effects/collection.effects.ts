import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../reducers/index';

import * as actions from '../actions/collection.actions';

import { HttpCollectionService } from '../../core/http-collection.service';

@Injectable()
export class CollectionEffectsService {

  constructor(private action$: Actions, private httpCollectionService: HttpCollectionService) {}

  @Effect() setSelectedCollectionId$: Observable<Action> = this.action$
    .ofType(actions.ActionTypes.SET_SELECTED_COLLECTION_ID)
    .map((action: actions.SetSelectedCollectionIdAction) => action.payload)
    .mergeMap((collection: string) => this.httpCollectionService.getCollection(collection), 
      (id: string, collection: any) => {
        console.log(collection);
        return new actions.SetCollectionAction({
          id: id,
          collection: collection
        })
      })
    .map((val) => {
      return val;
    });
};
/**
 * Get more at:
 * https://github.com/ngrx/effects
 */