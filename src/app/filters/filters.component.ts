import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Filter } from '../store/models/app.models';
import { FiltersService } from './filters.service';

@Component({
  moduleId: module.id,
  templateUrl: './filters.component.html',
  styleUrls: [ './filters.component.css' ]
})
export class FiltersComponent implements OnInit {
  filters$: Observable<Filter[]>;
  selected$: Observable<string>;

  constructor(private filtersService: FiltersService) {}

  ngOnInit() {
    this.filters$ = this.filtersService.getCollection();
    this.selected$ = this.filtersService.getSelected();
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
}