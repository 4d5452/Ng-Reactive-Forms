import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription} from 'rxjs/Subscription';

import { Filter, FilterType } from '../store/models/app.models';

import { CollectionService } from '../core/collection.service';
import { PopupService } from '../core/popup.service';

import { memberOfValidator } from '../shared/member-of';
import { isUniqueValidator } from '../shared/is-unique';

@Component({
  moduleId: module.id,
  templateUrl: './filters-modify.component.html',
  styleUrls: ['../shared/form-modify.css']
})
export class FiltersModifyComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  filters: string[];
  filterTypes: string[];
  task: string;
  filter: Filter;
  formErrors = {
    id: '',
    type: ''
  };
  validationMessages = {
    'id': {
      'required': 'ID is required',
      'isUnique': 'ID is not unique'
    },
    'type': {
      'required': 'Filter type is required',
      'memberOf': 'Filter type does not exist'
    }
  };
  valueChanges$: Subscription;

  constructor(private fb: FormBuilder, private collectionService: CollectionService,
    private popupService: PopupService) {
  }
  
  ngOnInit() {
    this.popupService.getPopupTask()
      .subscribe((task)=>this.task=task).unsubscribe();

    this.ids('filterTypes')
      .subscribe((types)=> {
        this.filterTypes=types
      }).unsubscribe();

    this.ids('filters')
      .subscribe((filters)=>{
        this.filters=filters;
      }).unsubscribe();    
    
    this.getFilter()
      .subscribe((filter)=> {
        this.filter = filter;
      }).unsubscribe();

    this.createForm();
  }

  ngOnDestroy(): void {
    this.valueChanges$.unsubscribe();
  }

  createForm() {
    this.formGroup = this.fb.group({
      id: [
        {value: this.filter['id'], disabled: (this.task==="edit"?true:false)}, 
        Validators.compose([
          Validators.required,
          isUniqueValidator(this.filters)
        ])
      ],
      type: [
        this.filter['type'], 
        Validators.compose([
          Validators.required,
          memberOfValidator(this.filterTypes)
        ])
      ]
    });

    this.valueChanges$ = this.formGroup.valueChanges
      .subscribe(data=> this.onValueChanged(data));

    this.onValueChanged();
  }

  prepareSave(): Filter {
    const formModel = this.formGroup.getRawValue();
    const saveFilter: Filter = {
      id: formModel.id,
      type: formModel.type,
      created: this.filter.created,
      modified: Date.now()
    }
    return saveFilter;
  }

  getFilter(): Observable<Filter> {
    return this.task==='edit' ? this.collectionService.getSelectedItem() : Observable.of(<Filter>{
        id: '', type: '', created: Date.now(), modified: Date.now()
      })
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
    this.collectionService.addEditItem(this.prepareSave(), 'filters');
    this.popupService.closePopup();
  }
  onCancel(): void {
    this.formGroup.reset();
    this.popupService.closePopup();
  }

  ids(collection: string): Observable<string[]> {
    return this.collectionService.getCollection(collection)
      .map((types)=>{
        return types.map((val)=>val['id']);
      })
  }
}