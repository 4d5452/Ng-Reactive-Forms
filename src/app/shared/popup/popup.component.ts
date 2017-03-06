import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { PopupService } from './popup.service';

import * as fromRoot from '../../store/reducers/index';

import { Position } from '../../store/models/position.models';

@Component({
  moduleId: module.id,
  selector: 'popup',
  templateUrl: './popup.component.html',
  styleUrls: [ './popup.component.css' ]
})
export class PopupComponent implements OnInit{
  popupPosition$: Observable<Position>;

  constructor(private popupService: PopupService) {}

  ngOnInit() {
    this.popupPosition$ = this.popupService.getPopupPosition();
  }

  close() {
    this.popupService.close();
  }
  updatePopupPosition(pos: Position): void {
    this.popupService.updatePopupPosition(pos);
  }
}