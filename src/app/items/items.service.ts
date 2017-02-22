import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from '../store/reducers/index';
import * as actions from '../store/actions/http.actions';
import * as HTTP from '../store/models/http.models';
import { Item } from '../store/models/items.models';

@Injectable()
export class ItemsService {
  items$: Observable<Item[]>;

  constructor(private store: Store<fromRoot.State>) {
    this.items$ = this.store.select<Item[]>(fromRoot.httpCollectionGetItems);
  }

  getItemsCollection(): Observable<Item[]> {
    return this.items$;
  }
  getAll(): void {
    const _get: HTTP.GetAll = { collection: 'items' }
    this.store.dispatch(new actions.GetAllAction(_get));
  }
  get(_id: number): void {
    const _get: HTTP.Get = { collection: 'items', id: _id }
    this.store.dispatch(new actions.GetAction(_get));
  }
  add(item: Object): void {
    const _post: HTTP.Post = { collection: 'items', body: item }
    this.store.dispatch(new actions.PostAction(_post));
  }
  remove(_id: number): void {
    const _delete: HTTP.Delete = { collection: 'items', id: _id }
    this.store.dispatch(new actions.DeleteAction(_delete));
  }
  update(_id: number, item: Object): void {
    const _put: HTTP.Put = { collection: 'items', id: _id, body: item }
    this.store.dispatch(new actions.PutAction(_put));
  }
}
