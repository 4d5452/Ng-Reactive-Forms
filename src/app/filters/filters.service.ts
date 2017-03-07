import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription'
import { Store } from '@ngrx/store';

import * as fromRoot from '../store/reducers/index';

import { Filter } from '../store/models/app.models'; // copy and paste from item service...


@Injectable()
export class FiltersService {
  constructor(private store: Store<fromRoot.State>) {}
}