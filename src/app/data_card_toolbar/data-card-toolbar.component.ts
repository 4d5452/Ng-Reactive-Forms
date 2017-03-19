import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'table-toolbar',
  templateUrl: './data-card-toolbar.component.html',
  styleUrls: ['./data-card-toolbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataCardToolbarComponent {
  @Input() addActive: boolean;
  @Input() editActive: boolean;
  @Input() removeActive: boolean;
  @Input() searchValue: string;

  @Output() add = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();
  @Output() remove = new EventEmitter<void>();
  @Output() search = new EventEmitter<string>();

  toggle(view: string): void {
    switch(view) {
      case('add'): return this.add.emit();
      case('edit'): return this.edit.emit();
      case('remove'): return this.remove.emit();
      default:
        throw new Error('Event Not Available: ' + view)
    }
  }

  setSearch(value: string): void {
    this.search.emit(value);
  }
}