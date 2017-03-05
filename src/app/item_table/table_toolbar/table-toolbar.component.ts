import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'table-toolbar',
  templateUrl: './table-toolbar.component.html'
})
export class TableToolbarComponent {
  @Input() selected: string;
  @Input() addVisible: boolean;
  @Input() editVisible: boolean;

  @Output() add = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();
  @Output() remove = new EventEmitter<void>();
  @Output() filter = new EventEmitter<string>();

  _filter: string = '';

  toggleAddView(): void {
    this.add.emit();
  }
  toggleEditView(): void {
    this.edit.emit();
  }
  removeSelected(): void {
    this.remove.emit();
  }
  setFilter(filter: string): void {
    this.filter.emit(filter);
  }
}