import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { CollectionService } from '../core/collection.service';

@Component({
  moduleId: module.id,
  template: ``
})
export class RecordsComponent implements OnInit {

  constructor(private collectionService: CollectionService) {}

  ngOnInit() {
    this.collectionService.setCollection('records');
  }
}