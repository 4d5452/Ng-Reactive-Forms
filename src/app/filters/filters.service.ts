import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription'
import { Store } from '@ngrx/store';

import * as fromRoot from '../store/reducers/index';

import { Filter } from '../store/models/app.models'; // copy and paste from item service...

import { TableDataType, ColumnMetaObject } from '../store/models/table.models';
import * as tableActions from '../store/actions/table.actions';

@Injectable()
export class FiltersService {
  columnMeta: ColumnMetaObject[] = [
    { column: 'ID', selector: 'id', type: TableDataType.STRING },
    { column: 'TYPE', selector: 'type', type: TableDataType.STRING },
    { column: 'CREATED', selector: 'created', type: TableDataType.DATE },
    { column: 'MODIFIED', selector: 'modified', type: TableDataType.DATE }
  ]
  constructor(private store: Store<fromRoot.State>) {}

  configTable(): void {
    this.store.dispatch(new tableActions.SetColumnsAction(this.columnMeta));
  }
}