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

  constructor(private store: Store<fromRoot.State>, private router: Router, private collection: CollectionService) {
    this.isPopupOpen$ = this.store.select<boolean>(fromRoot.popupIsOpen);
    this.popupPosition$ = this.store.select<Position>(fromRoot.popupGetPosition);
  }

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
  openPopup(): void {    
    this.store.dispatch(new popupActions.OpenPopupAction(null));
    this.isPopupOpen$.subscribe((isOpen) => {
      setTimeout(()=>{
        this.router.navigate(['dashboard/popup', 
          { outlets: {collection: ['filters']} }
        ]);
      },100);
    }).unsubscribe();
  }
  getPopupPosition(): Observable<Position> {
    return this.popupPosition$;
  }
  updatePopupPosition(pos: Position): void{
    this.store.dispatch(new popupActions.UpdatePopupPosition(pos));
  }
  isPopupOpen(): Observable<boolean> {
    return this.isPopupOpen$;
  }
}