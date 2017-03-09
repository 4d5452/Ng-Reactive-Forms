import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../store/reducers/index';

import { CollectionService } from './collection.service';

import { Position } from '../store/models/position.models';
import * as popupActions from '../store/actions/popup.actions';

@Injectable()
export class PopupService {
  popupPosition$: Observable<Position>;
  isPopupOpen$: Observable<boolean>;
  /**The idea, is that the popup is unaware of its task, but others will be interested */
  popupTask$: Observable<string>;

  constructor(private store: Store<fromRoot.State>, private router: Router, private collection: CollectionService) {
    this.isPopupOpen$ = this.store.select<boolean>(fromRoot.popupIsOpen);
    this.popupPosition$ = this.store.select<Position>(fromRoot.popupGetPosition);
    this.popupTask$ = this.store.select<string>(fromRoot.popupGetTask);
  }

  /**This is the region I suspect to cause the current memory-leak... 
   * Router logic MUST be relocated
  */
  closePopup(): void {
    this.store.dispatch(new popupActions.ClosePopupAction(null));
    this.isPopupOpen$.subscribe((isOpen) => {
      this.router.navigate(['dashboard/popup',
        { outlets: {collection: null} }
      ]).then(()=>{
        this.router.navigate(['dashboard']);
      })
    }).unsubscribe();
  }
  openPopup(task: string): void {    
    this.store.dispatch(new popupActions.OpenPopupAction(task));
    this.isPopupOpen$.subscribe((isOpen) => {
      setTimeout(()=>{
        this.router.navigate(['dashboard/popup', 
          { outlets: {collection: ['filters']} }
        ]);
      },100);
    }).unsubscribe();
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