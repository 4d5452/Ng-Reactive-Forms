import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Filter } from '../store/models/app.models';
import { FiltersService } from './filters.service';

import { Position } from '../store/models/position.models';

@Component({
  moduleId: module.id,
  templateUrl: './filters.component.html',
  styleUrls: [ './filters.component.css' ]
})
export class FiltersComponent implements OnInit {
  selected$: Observable<string>;
  viewAdd$: Observable<boolean>;
  viewAddPosition$: Observable<Position>;

  constructor(private filtersService: FiltersService) {}

  ngOnInit() {
    this.filtersService.configTable();
    this.selected$ = this.filtersService.getSelected();
    this.viewAdd$ = this.filtersService.getViewAdd();
    this.viewAddPosition$ = this.filtersService.getViewAddPosition();
  }
  
  toggleViewAdd(): void {
    this.filtersService.toggleViewAdd();
  }
  updateViewAddPosition(pos: Position): void {
    this.filtersService.updateViewAddPosition(pos)
  }
  removeSelected(): void {
    this.filtersService.removeSelected();
  }
}