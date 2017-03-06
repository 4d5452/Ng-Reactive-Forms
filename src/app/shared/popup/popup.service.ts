import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../../store/reducers/index';

import { Position } from '../../store/models/position.models';
import * as popupActions from '../../store/actions/popup.actions';

@Injectable()
export class PopupService {
  popupPosition$: Observable<Position>;
  popupOpen$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {
    this.popupOpen$ = this.store.select<boolean>(fromRoot.popupIsOpen);
    this.popupPosition$ = this.store.select<Position>(fromRoot.popupGetPosition);
  }

  close(): void {
    this.store.dispatch(new popupActions.ClosePopupAction(null));
  }
  open(): void {
    this.store.dispatch(new popupActions.OpenPopupAction(null));
  }
  getPopupPosition(): Observable<Position> {
    return this.popupPosition$;
  }
  updatePopupPosition(pos: Position): void{
    this.store.dispatch(new popupActions.UpdatePopupPosition(pos));
  }
  isPopupOpen(): Observable<boolean> {
    return this.popupOpen$;
  }
}