import { Directive, ElementRef, Output, Input, HostListener, EventEmitter } from '@angular/core';

@Directive({ 
  selector: '[getHeight]'
})
export class GetHeightDirective {
  @Input('getHeight') emitter: EventEmitter<string>;

  constructor(private el: ElementRef) {}

  @HostListener('window:resize') onResize() {
    this.emitter.emit(this.el.nativeElement.children);
  }
}