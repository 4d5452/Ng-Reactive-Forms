import { Action } from '@ngrx/store';
import { FormGroup } from '@angular/forms';

import { type } from '../../shared/util';

export const ActionTypes = {
  ADD_FORM_GROUP: type('[Form Group] Add Form Group')
}; // end ActionTypes

export class AddFormGroupAction implements Action {
  type = ActionTypes.ADD_FORM_GROUP;
  constructor(public payload: {collection: string, formGroup: FormGroup}) {}
}

export type Actions
  = AddFormGroupAction