import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { PopupService } from './popup.service';

@Injectable()
export class PopupGuardService implements CanActivateChild {

  constructor(private popupService: PopupService) {}

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.popupService.isPopupOpen().map(v=>!v);
  }
}