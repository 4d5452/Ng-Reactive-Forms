import { Injectable } from '@angular/core';
import { Router, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { PopupService } from './popup.service';

@Injectable()
export class PopupGuardService implements CanActivateChild {

  constructor(private popupService: PopupService, private router: Router) {}
  /**If the popup is open, don't allow a redirect */
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.popupService.isPopupOpen().map(v=>{
      /**if the popup is open, only allow popup navigation */
      if(v && route.outlet==="popup"){
        return true;
      }else if(!v && route.outlet==="popup"){
        /**Redirect to home: the url was left in place, but the popup had been closed */
        this.router.navigate(['']);
        return false;
      }
      /**if the popup is open, disallow all other routes */
      return v ? false : true;
    });
  }
}