import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../../store/reducers/index';
import * as fromHttp from '../../store/reducers/http.reducers';
import * as HTTP from '../../store/models/http.models';

@Injectable()
export class ResponseService {
  constructor(private store: Store<fromRoot.State>) {}

  handleLatest(latest: HTTP.SuccessResponse): void {
    console.log(latest);
  }

  handleLatestError(latestError: HTTP.FailureResponse): void {

  }

  init(): void {
    this.store.select<HTTP.SuccessResponse>(fromRoot.httpGetLatest)
      .subscribe(latest => this.handleLatest(latest));
    this.store.select<HTTP.FailureResponse>(fromRoot.httpGetLatestError)
      .subscribe(latestError => this.handleLatestError(latestError));
  }
}