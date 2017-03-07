import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Filter } from '../store/models/app.models';
import { FiltersService } from './filters.service';

import { CollectionService } from '../core/collection.service'

@Component({
  moduleId: module.id,
  template: ``
})
export class FiltersComponent implements OnInit {

  constructor(private filtersService: FiltersService, private collectionService: CollectionService) {}

  ngOnInit() {
    this.collectionService.setSelectedCollectionId('filters');
    this.filtersService.configTable();
  }
}