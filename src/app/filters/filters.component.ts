import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Filter } from '../store/models/app.models';
import { FiltersService } from './filters.service';

import { TableMetaData } from '../store/models/table.models';

import { Position } from '../store/models/position.models';

@Component({
  moduleId: module.id,
  templateUrl: './filters.component.html',
  styleUrls: [ './filters.component.css' ]
})
export class FiltersComponent implements OnInit {
  filters$: Observable<Filter[]>;
  selected$: Observable<string>;
  viewAdd$: Observable<boolean>;
  viewAddPosition$: Observable<Position>;
  tableMetaData$: Observable<TableMetaData>;
  filter: string = '';
  constructor(private filtersService: FiltersService) {}

  ngOnInit() {
    this.filters$ = this.filtersService.getCollection();
    this.selected$ = this.filtersService.getSelected();
    this.viewAdd$ = this.filtersService.getViewAdd();
    this.viewAddPosition$ = this.filtersService.getViewAddPosition();
    this.tableMetaData$ = this.filtersService.getTableMetaData();
  }
  
  removeSelected(): void {
    this.filtersService.removeSelected();
  }
  setSelected(selected: Filter): void {
    this.filtersService.setSelected(selected);
  }
  clearSelected(): void {
    this.filtersService.clearSelected();
  }
  toggleViewAdd(): void {
    this.filtersService.toggleViewAdd();
  }
  updateViewAddPosition(pos: Position): void {
    this.filtersService.updateViewAddPosition(pos)
  }
  setSelectedColumn(column: string): void {
    this.filtersService.setSelectedColumn(column);
  }
}