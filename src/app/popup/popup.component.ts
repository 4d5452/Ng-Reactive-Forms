import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { PopupService } from '../core/popup.service';

import { Position } from '../store/models/position.models';

@Component({
  moduleId: module.id,
  selector: 'popup',
  templateUrl: './popup.component.html',
  styleUrls: [ './popup.component.css' ]
})
export class PopupComponent implements OnInit{
  popupPosition$: Observable<Position>;
  isPopupOpen$: Observable<boolean>;

  constructor(private popupService: PopupService) {}

  ngOnInit() {
    this.popupPosition$ = this.popupService.getPopupPosition();
    this.isPopupOpen$ = this.popupService.isPopupOpen();
  }

  close() {
    this.popupService.close();
  }
  updatePopupPosition(pos: Position): void {
    this.popupService.updatePopupPosition(pos);
  }
}