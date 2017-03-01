import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from '../store/reducers/index';
import * as httpActions from '../store/actions/http.actions';
import * as HTTP from '../store/models/http.models';

import { Filter } from '../store/models/app.models'; // copy and paste from item service...
import * as filterActions from '../store/actions/filters.actions';

@Injectable()
export class FiltersService {
  filters$: Observable<Filter[]>;
  selected$: Observable<string>;

  constructor(private store: Store<fromRoot.State>) {
    this.filters$ = this.store.select<Filter[]>(fromRoot.httpCollectionGetFilters);
    this.selected$ = this.store.select<string>(fromRoot.filtersGetSelected);
  }

  getCollection(): Observable<Filter[]> {
    return this.filters$;
  }
  getAll(): void {
    const _getAll: HTTP.GetAll = { collection: 'filters' }
    this.store.dispatch(new httpActions.GetAllAction(_getAll));
  }
  get(_id: number): void {
    const _get: HTTP.Get = { collection: 'filters', id: _id }
    this.store.dispatch(new httpActions.GetAction(_get));
  }
  add(item: Object): void {
    const _post: HTTP.Post = { collection: 'filters', body: item }
    this.store.dispatch(new httpActions.PostAction(_post));
  }
  remove(_id: number): void {
    const _delete: HTTP.Delete = { collection: 'filters', id: _id }
    this.store.dispatch(new httpActions.DeleteAction(_delete));
  }
  update(_id: number, item: Object): void {
    const _put: HTTP.Put = { collection: 'filters', id: _id, body: item }
    this.store.dispatch(new httpActions.PutAction(_put));
  }

  getSelected(): Observable<string> {
    return this.selected$;
  }
  setSelected(selected: Filter) {
    this.store.dispatch(new filterActions.SetSelectedAction(selected.id));
  }
  clearSelected(): void {
    this.store.dispatch(new filterActions.ClearSelectedAction());
  }
}