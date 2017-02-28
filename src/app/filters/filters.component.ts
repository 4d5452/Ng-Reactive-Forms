import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Filter } from '../store/models/app.models';
import { FiltersService } from './filters.service';

@Component({
  moduleId: module.id,
  templateUrl: './filters.component.html'
})
export class FiltersComponent implements OnInit {
  filters$: Observable<Filter[]>;
  selectedId: Observable<number>;

  constructor(private filtersService: FiltersService) {}

  ngOnInit() {
    this.filters$ = this.filtersService.getCollection();
  }

  setSelected(id: number): void {
    //this.filtersService.setSelected();
    console.log("Selected Set", id);
  }
}