import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Filter as Item } from '../store/models/app.models';

@Component({
  selector: 'filters-list',
  template: `
    <h3>Filters List</h3>
    <div>
      <li *ngFor="let item of items" (click)="selected.emit(item)" [class.selected]="item.id===selectedId">
        {{item.id}} {{item.type}} {{item.modified | date}}
      </li>
    </div>
  `,
  styles: [`
    .selected {
      background-color: yellow
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FiltersListComponent {
  @Input() items: Item[];
  @Input() selectedId: number;
  @Output() selected = new EventEmitter<Item>();
}