import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'popup-content',
  templateUrl: './popup-content.component.html',
  styleUrls: [ './popup-content.component.css']
})
export class PopupContentComponent {
  @Output() close = new EventEmitter<null>();

  _close(): void {
    this.close.emit();
  }
}