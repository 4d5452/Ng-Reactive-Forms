import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription} from 'rxjs/Subscription';

import { FilterType } from '../store/models/app.models';
import { isUniqueValidator } from '../shared/is-unique';

import { CollectionService } from '../core/collection.service';
import { PopupService } from '../core/popup.service';

@Component({
  moduleId: module.id,
  templateUrl: './filter-types-modify.component.html',
  styleUrls: ['../shared/form-modify.css']
})
export class FilterTypesModifyComponent implements OnInit, OnDestroy{
  formGroup: FormGroup;
  task: string;
  filterType: FilterType;
  types: string[];
  formErrors = {
    id: ''
  };
  validationMessages = {
    'id': {
      'required': 'ID is required',
      'isUnique': 'ID is not unique'
    }
  };
  valueChanges$: Subscription;

  constructor(private fb: FormBuilder, private collectionService: CollectionService,
    private popupService: PopupService) {}
  
  ngOnInit() {
    this.popupService.getPopupTask()
      .subscribe((task)=>this.task=task).unsubscribe();
    
    this.ids('filterTypes')
      .subscribe((types)=> this.types=types)
      .unsubscribe();

    this.getFilterType()
      .subscribe((filterType)=> {
        this.filterType = filterType;
      }).unsubscribe();

    this.createForm();
  }
  ngOnDestroy() {
    this.valueChanges$.unsubscribe();
  }

  createForm() {
    this.formGroup = this.fb.group({
      id: [
        this.filterType['id'], 
        Validators.compose([
          Validators.required,
          isUniqueValidator(this.types)
        ])
      ]
    });
    this.valueChanges$ = this.formGroup.valueChanges
      .subscribe(data=> this.onValueChanged(data));

    this.onValueChanged();
  }
  onValueChanged(data?: any): void {
    if(!this.formGroup) { return; }
    const form = this.formGroup;

    for(const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if(control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for(const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  onSubmit(): void {
    this.collectionService.addEditItem(this.prepareSave(), 'filterTypes');
    this.popupService.closePopup();
  }
  onCancel(): void {
    this.formGroup.reset();
    this.popupService.closePopup();
  }

  prepareSave(): FilterType {
    const formModel = this.formGroup.value;
    const saveModel: FilterType = {
      id: formModel.id
    }
    return saveModel;
  }
  getFilterType(): Observable<FilterType> {
    return this.task==='edit' ? this.collectionService.getSelectedItem() : Observable.of(<FilterType>{
      id: ''
    });
  }

  ids(collection: string): Observable<string[]> {
    return this.collectionService.getCollection(collection)
      .map((types)=>{
        return types.map((val)=>val['id']);
      })
  }
}