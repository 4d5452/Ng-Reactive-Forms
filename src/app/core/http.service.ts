import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from '../store/reducers/index';

import * as actions from '../store/actions/http.actions';
import * as HTTP from '../store/models/http.models';

@Injectable()
export class HttpService {

  constructor(private store: Store<fromRoot.State>) {}

  getAll(args: HTTP.GetAll): void {
    console.log("TODO: Http Get All");
  }
  get(args: HTTP.Get): void {
    console.log("TODO: Http Get");
  }
  put(args: HTTP.Put): void {
    console.log("TODO: Http Put");
  }
  post(args: HTTP.Post): void {
    console.log("TODO: Http Post");
  }
  delete(args: HTTP.Delete): void {
    this.store.dispatch(new actions.DeleteAction(args));
  }
}