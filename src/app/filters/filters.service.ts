import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from '../store/reducers/index';

import { Filter } from '../store/models/app.models'; // copy and paste from item service...
import * as filterActions from '../store/actions/filters.actions';

import { ColumnMetaObject } from '../store/models/table.models';
import * as tableActions from '../store/actions/table.actions';

import { Position } from '../store/models/position.models';

@Injectable()
export class FiltersService {
  viewAdd$: Observable<boolean>;
  viewAddPosition$: Observable<Position>;
  selected$ : Observable<string>;

  constructor(private store: Store<fromRoot.State>) {
    this.viewAdd$ = this.store.select<boolean>(fromRoot.filtersGetViewAdd);
    this.viewAddPosition$ = this.store.select<Position>(fromRoot.filtersGetViewAddPosition);
    this.selected$ = this.store.select<string>(fromRoot.tableGetSelected);
  }

  configTable(): void {
    this.store.select<Filter[]>(fromRoot.httpCollectionGetFilters)
      .subscribe((filters: Filter[]) => { 
        this.store.dispatch(new tableActions.SetItemsAction(filters));
       });
    this.store.select<ColumnMetaObject[]>(fromRoot.filtersGetColumnMetaObjectArray)
      .subscribe((meta: ColumnMetaObject[]) => { 
        this.store.dispatch(new tableActions.SetColumnsAction(meta));
       });
  }
  removeSelected(): void {
    this.store.dispatch(new filterActions.RemoveSelectedAction(null));
  }
  getViewAdd(): Observable<boolean> {
    return this.viewAdd$;
  }
  toggleViewAdd(): void {
    this.store.dispatch(new filterActions.ToggleViewAddAction(null));
  }
  getViewAddPosition(): Observable<Position> {
    return this.viewAddPosition$;
  }
  updateViewAddPosition(pos: Position): void{
    this.store.dispatch(new filterActions.UpdateViewAddPositionAction(pos));
  }
  getSelected(): Observable<string> {
    return this.selected$;
  }
}