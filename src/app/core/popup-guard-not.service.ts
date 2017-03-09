import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { PopupService } from './popup.service';

@Injectable()
export class PopupGuardNotService implements CanActivate {

  constructor(private popupService: PopupService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    /**Needs lots of work: merge this with popup-guard.service and handle
     * logic based on current route.
     */
    return this.popupService.isPopupOpen()
      .switchMap((isOpen)=> {
        if(isOpen){
          return Observable.of(true).map(v=>v);
        }
        this.router.navigate(['dashboard']);
        return Observable.of(false).map(v=>v);
      })
  }
}