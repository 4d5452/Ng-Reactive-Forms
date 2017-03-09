import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { Filter, FilterType } from '../store/models/app.models';

import { CollectionService } from '../core/collection.service';
import { PopupService } from '../core/popup.service';

@Component({
  moduleId: module.id,
  templateUrl: './filters-modify.component.html',
  styleUrls: ['./filters-modify.component.css']
})
export class FiltersModifyComponent {
  filterForm: FormGroup;
  filterTypes$: Observable<FilterType[]>;
  popupTask$: Observable<string>;

  filter: Filter;

  constructor(private fb: FormBuilder, private collectionService: CollectionService,
    private popupService: PopupService) {
    this.filterTypes$ = this.collectionService.getCollection('filterTypes');
    this.popupTask$ = this.popupService.getPopupTask();
    this.getFilter()
      .subscribe((filter)=> {
        this.filter = filter;
      }).unsubscribe();
    this.createForm();
  }
  
  createForm() {
    this.filterForm = this.fb.group({
      id: [this.filter['id'], Validators.required ],
      filterType: [this.filter['type'].upc, Validators.required ]
    });
  }

  onSubmit(): void {
    this.popupService.closePopup();
  }

  getFilter(): Observable<Filter> {
    return this.popupTask$
      .switchMap((task)=> {
        return task==='edit' ? this.collectionService.getSelectedItem() : Observable.of(<Filter>{
          id: '', type: { id: '', upc: '' }, created: new Date(), modified: new Date()
        })
      })
  }
}