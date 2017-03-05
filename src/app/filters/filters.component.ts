import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Filter } from '../store/models/app.models';
import { FiltersService } from './filters.service';

@Component({
  moduleId: module.id,
  template: ``
})
export class FiltersComponent implements OnInit, OnDestroy {

  constructor(private filtersService: FiltersService) {}

  ngOnInit() {
    this.filtersService.configTable();
  }
  ngOnDestroy() {
    this.filtersService.destroy();
  }
}