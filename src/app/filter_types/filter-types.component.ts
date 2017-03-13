import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { FilterType } from '../store/models/app.models';

import { MetaObject, Type } from '../store/models/collection.models';
import { CollectionService } from '../core/collection.service'

@Component({
  moduleId: module.id,
  template: ``
})
export class FilterTypesComponent implements OnInit {
  meta: MetaObject[] = [
    { header: 'UPC', selector: ['id'], type: Type.STRING }
  ];

  constructor(private collectionService: CollectionService) {}

  ngOnInit() {
    this.collectionService.setCollectionMetaData('filterTypes', this.meta);
  }
}