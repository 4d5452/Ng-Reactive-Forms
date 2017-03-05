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
  selected$: Observable<string>;

  constructor(private filtersService: FiltersService) {}

  ngOnInit() {
    this.filtersService.configTable();
  }
  
  removeSelected(): void {
    this.filtersService.removeSelected();
  }
}