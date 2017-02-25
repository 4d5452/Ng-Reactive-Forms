import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Filter as Item } from '../store/models/app.models';

@Component({
  selector: 'filters-list',
  template: `
    <h3>Filters List</h3>
    <md-list dense>
      <md-list-item *ngFor="let item of items" (click)="selected.emit(item)" [class.selected]="item.id===selectedId">
        <h4 md-line>{{item.id}}</h4>
        <p md-line>{{item.type}}</p>
        <p md-line>{{item.created | date}}</p>
      </md-list-item>
    </md-list>
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