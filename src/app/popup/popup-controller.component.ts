import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterState } from '@ngrx/router-store';

import { PopupService } from '../core/popup.service';

@Component({
  selector: 'popup-controller',
  template: ``
})
export class PopupControllerComponent implements OnInit, OnDestroy {
  /**Will only exist when the popup is open... The only purpose of this Component
   * is navigation.
  */
  constructor(private router: Router, private route: ActivatedRoute) {}
  /**Open the modify outlet on the current route */
  ngOnInit() {
    this.router.navigate([this.router.url,
      { outlets: { popup: [ 'modify' ] } }
    ]);
  }
  /** Close the modify outlet on the current route */
  ngOnDestroy() {
    this.router.navigate([this.router.url,
      { outlets: {popup: null} }
    ]);
  }
}