import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription} from 'rxjs/Subscription';

import { FilterType } from '../store/models/app.models';

import { CollectionService } from '../core/collection.service';
import { PopupService } from '../core/popup.service';

@Component({
  moduleId: module.id,
  templateUrl: './filter-types-modify.component.html',
  styleUrls: ['./filter-types-modify.component.css']
})
export class FilterTypesModifyComponent implements OnInit, OnDestroy{
  formGroup: FormGroup;
  popupTask$: Observable<string>;
  filterType$: Subscription;
  filterType: FilterType;

  constructor(private fb: FormBuilder, private collectionService: CollectionService,
    private popupService: PopupService) {
    this.popupTask$ = this.popupService.getPopupTask();
  }
  
  ngOnInit() {
    this.filterType$ = this.getFilterType().subscribe((filterType)=> {
      this.filterType = filterType;
    });
    this.createForm();
  }
  ngOnDestroy() {
    this.filterType$.unsubscribe();
  }

  createForm() {
    this.formGroup = this.fb.group({
      id: [this.filterType['id'], Validators.required ]
    });
  }

  onSubmit(): void {
    this.collectionService.addEditItem(this.prepareSave(), 'filterTypes');
    this.popupService.closePopup();
  }

  prepareSave(): FilterType {
    const formModel = this.formGroup.value;
    const saveFilter: FilterType = {
      id: formModel.id
    }
    return saveFilter;
  }
  getFilterType(): Observable<FilterType> {
    return this.popupTask$
      .switchMap((task)=> {
        return task==='edit' ? this.collectionService.getSelectedItem() : Observable.of(<FilterType>{
          id: ''
        })
      })
  }
}