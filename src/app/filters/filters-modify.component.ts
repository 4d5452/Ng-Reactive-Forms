import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription} from 'rxjs/Subscription';

import { Filter, FilterType } from '../store/models/app.models';

import { CollectionService } from '../core/collection.service';
import { PopupService } from '../core/popup.service';

@Component({
  moduleId: module.id,
  templateUrl: './filters-modify.component.html',
  styleUrls: ['../shared/form-modify.css']
})
export class FiltersModifyComponent implements OnInit, OnDestroy{
  formGroup: FormGroup;
  filterTypes$: Observable<FilterType[]>;
  popupTask$: Observable<string>;
  filter$: Subscription;
  filter: Filter;

  constructor(private fb: FormBuilder, private collectionService: CollectionService,
    private popupService: PopupService) {
    this.filterTypes$ = this.collectionService.getCollection('filterTypes');
    this.popupTask$ = this.popupService.getPopupTask();
  }
  
  ngOnInit() {
    this.filter$ = this.getFilter().subscribe((filter)=> {
      this.filter = filter;
    });
    this.createForm();
  }
  ngOnDestroy() {
    this.filter$.unsubscribe();
  }

  createForm() {
    this.formGroup = this.fb.group({
      id: [this.filter['id'], Validators.required ],
      filterType: [this.filter['type'], Validators.required ]
    });
  }

  prepareSave(): Filter {
    const formModel = this.formGroup.value;
    const saveFilter: Filter = {
      id: formModel.id,
      type: formModel.filterType,
      created: this.filter.created,
      modified: Date.now()
    }
    return saveFilter;
  }

  getFilter(): Observable<Filter> {
    return this.popupTask$
      .switchMap((task)=> {
        return task==='edit' ? this.collectionService.getSelectedItem() : Observable.of(<Filter>{
          id: '', type: '', created: Date.now(), modified: Date.now()
        })
      })
  }
  
  onSubmit(): void {
    this.collectionService.addEditItem(this.prepareSave(), 'filters');
    this.popupService.closePopup();
  }
  onCancel(): void {
    this.formGroup.reset();
    this.popupService.closePopup();
  }
}