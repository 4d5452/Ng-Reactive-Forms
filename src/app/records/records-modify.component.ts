import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription} from 'rxjs/Subscription';

import { Filter, CleaningRecord } from '../store/models/app.models';

import { memberOfValidator } from '../shared/member-of';
import { isUniqueValidator } from '../shared/is-unique';

import { CollectionService } from '../core/collection.service';
import { PopupService } from '../core/popup.service';

@Component({
  moduleId: module.id,
  templateUrl: './records-modify.component.html',
  styleUrls: ['../shared/form-modify.css']
})
export class RecordsModifyComponent implements OnInit, OnDestroy{
  formGroup: FormGroup;
  task: string;
  filters: string[];
  records: string[];
  record: CleaningRecord;  
  formErrors = {
    id: '',
    filter: '',
    currentEquipmentMeter: '',
    pre: '',
    post: '',
    cycles: ''
  };
  validationMessages = {
    'id': {
      'required': 'ID is required',
      'isUnique': 'ID is not unique'
    },
    'filter': {
      'required': 'Filter ID is required',
      'memberOf': 'Filter does not exist'
    },
    'currentEquipmentMeter': {
      'required': 'Current equipment meter is required',
    },
    'pre': {
      'required': 'Pre clean value is required',
    },
    'post': {
      'required': 'Post clean value is required',
    },
    'cycles': {
      'required': '# of cycles is required',
    }
  };
  valueChanges$: Subscription;

  constructor(private fb: FormBuilder, private collectionService: CollectionService,
    private popupService: PopupService) {
  }
  
  ngOnInit() {
    this.popupService.getPopupTask()
      .subscribe((task)=>this.task=task).unsubscribe();

    this.ids('records')
      .subscribe((records)=>this.records=records)
      .unsubscribe();

    this.ids('filters')
      .subscribe((filters)=>this.filters=filters)
      .unsubscribe();

    this.getRecord()
      .subscribe((record)=> {
        this.record = record;
      }).unsubscribe();

    this.createForm();
  }
  ngOnDestroy() {
    this.valueChanges$.unsubscribe();
  }

  createForm() {
    this.formGroup = this.fb.group({
      id: [
        this.record['id'], 
        Validators.compose([
          Validators.required,
          isUniqueValidator(this.records)
        ])
      ],
      filter: [
        this.record['filter'], 
        Validators.compose([
          Validators.required,
          memberOfValidator(this.filters)
        ])
      ],
      currentEquipmentMeter: [
        this.record['currentEquipmentMeter'], 
        Validators.compose([
          Validators.required
        ])
      ],
      pre: [
        this.record['pre'], 
        Validators.required 
      ],
      post: [
        this.record['post'], 
        Validators.required 
      ],
      cycles: [
        this.record['cycles'], 
        Validators.required 
      ],
    });

    this.valueChanges$ = this.formGroup.valueChanges
      .subscribe(data=> this.onValueChanged(data));

    this.onValueChanged();
  }

  onSubmit(): void {
    this.collectionService.addEditItem(this.prepareSave(), 'records');
    this.popupService.closePopup();
  }
  onCancel(): void {
    this.formGroup.reset();
    this.popupService.closePopup();
  }

  prepareSave(): CleaningRecord {
    const formModel = this.formGroup.value;
    const saveModel: CleaningRecord = {
      id: formModel.id,
      filter: formModel.filter,
      currentEquipmentMeter: formModel.currentEquipmentMeter,
      pre: formModel.pre,
      post: formModel.post,
      cycles: formModel.cycles,
      created: this.record.created,
      modified: Date.now()
    }
    return saveModel;
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
  getRecord(): Observable<CleaningRecord> {
    return this.task==='edit' ? this.collectionService.getSelectedItem() : Observable.of(<CleaningRecord>{
      id: '', filter: '', currentEquipmentMeter: null, pre: null, post: null, cycles: null, created: Date.now(), modified: Date.now()
    })
  }

  ids(collection: string): Observable<string[]> {
    return this.collectionService.getCollection(collection)
      .map((types)=>{
        return types.map((val)=>val['id']);
      })
  }
}