import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Filter } from '../store/models/app.models';

import { MetaObject, Type } from '../store/models/collection.models';
import { CollectionService } from '../core/collection.service'

@Component({
  moduleId: module.id,
  template: `<router-outlet name="popup"></router-outlet>`
})
export class FiltersComponent implements OnInit {
  meta: MetaObject[] = [
    { header: 'ID', selector: 'id', type: Type.STRING },
    { header: 'TYPE', selector: 'type', type: Type.STRING },
    { header: 'CREATED', selector: 'created', type: Type.DATE },
    { header: 'MODIFIED', selector: 'modified', type: Type.DATE }
  ];

  constructor(private collectionService: CollectionService) {}

  ngOnInit() {
    this.collectionService.setCollectionMetaData('filters', this.meta);
  }
}