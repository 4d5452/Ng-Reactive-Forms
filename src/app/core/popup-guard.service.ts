import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { PopupService } from './popup.service';

@Injectable()
export class PopupGuardService implements CanActivate {

  constructor(private popupService: PopupService) {}
  /**If the popup is open, don't allow a redirect */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.popupService.isPopupOpen().map(v=>!v);
  }
}