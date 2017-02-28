import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Filter } from '../store/models/app.models';

@Component({
  moduleId: module.id,
  selector: 'filters-list',
  templateUrl: './filters-list.component.html',
  styleUrls: [ './filters-list.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FiltersListComponent {
  @Input() filters: Filter[];
  @Input() selectedId: string;
  @Output() selected = new EventEmitter<Filter>();

  isSelected(index: number): boolean {
    return false;
  }
}