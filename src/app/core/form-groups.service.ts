import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../store/reducers/index';

import * as formGroupActions from '../store/actions/popup.actions';

@Injectable()
export class FormGroupsService {
  formGroups: Map<string, Observable<FormGroup>>;

  constructor(private store: Store<fromRoot.State>) {
    this.formGroups = new Map<string, Observable<FormGroup>>();
    this.formGroups.set('filters', store.select<FormGroup>(fromRoot.formGroupsGetFilterGroup));
  }

  getFormGroup(collection: string): Observable<FormGroup> {
    this.validCollection(collection);
    return this.formGroups.get(collection);
  }

    validCollection(collection: string): void {
    if(!this.formGroups.has(collection)) {
      throw new Error("Collection Does Not Exist: Form-Group-Service");
    }
  }
}