import { Directive, ElementRef, Input, SimpleChanges } from '@angular/core';

@Directive({ 
  selector: '[setHeight]'
})
export class SetHeightDirective {
  @Input('setHeight') height: string;

  constructor(private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges) {
    this.setHeight(changes['height'].currentValue);
  }

  private setHeight(height: string): void {
    this.el.nativeElement.style.height = height;
  }
}