import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { PopupService } from './popup.service';

@Injectable()
export class PopupGuardService implements CanActivate {

  isPopupOpen$: Observable<boolean>;

  constructor(private popupService: PopupService) {
    this.isPopupOpen$ = this.popupService.isPopupOpen();
  }

  canActivate() {
    return this.isPopupOpen$.map((isOpen) => {
      console.log("PopupGuard#canActivate Called");
      return isOpen ? false:true;
    });
  }
}