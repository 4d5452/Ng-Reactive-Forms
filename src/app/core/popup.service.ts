import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../store/reducers/index';

import { Position } from '../store/models/position.models';
import * as popupActions from '../store/actions/popup.actions';

@Injectable()
export class PopupService {
  popupPosition$: Observable<Position>;
  isPopupOpen$: Observable<boolean>;
  /**The idea, is that the popup is unaware of its task, but those that open it will */
  popupTask$: Observable<string>;

  constructor(private store: Store<fromRoot.State>) {
    this.isPopupOpen$ = this.store.select<boolean>(fromRoot.popupIsOpen);
    this.popupPosition$ = this.store.select<Position>(fromRoot.popupGetPosition);
    this.popupTask$ = this.store.select<string>(fromRoot.popupGetTask);
  }

  closePopup(): void {
    this.store.dispatch(new popupActions.ClosePopupAction(null));
  }
  openPopup(task: string): void {    
    this.store.dispatch(new popupActions.OpenPopupAction(task));
  }
  /**The popups current position */
  getPopupPosition(): Observable<Position> {
    return this.popupPosition$;
  }
  /**Update the popups position with passed position object */
  updatePopupPosition(pos: Position): void{
    this.store.dispatch(new popupActions.UpdatePopupPosition(pos));
  }
  /**...return Observable of popupOpen status */
  isPopupOpen(): Observable<boolean> {
    return this.isPopupOpen$;
  }
  /**return the popups task. */
  getPopupTask(): Observable<string> {
    return this.popupTask$;
  }
}