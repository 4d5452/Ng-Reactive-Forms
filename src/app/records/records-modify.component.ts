import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription} from 'rxjs/Subscription';

import { Filter, CleaningRecord } from '../store/models/app.models';

import { CollectionService } from '../core/collection.service';
import { PopupService } from '../core/popup.service';

@Component({
  moduleId: module.id,
  templateUrl: './records-modify.component.html',
  styleUrls: ['../shared/form-modify.css']
})
export class RecordsModifyComponent implements OnInit, OnDestroy{
  formGroup: FormGroup;
  popupTask$: Observable<string>;

  filters$: Observable<Filter[]>;

  record$: Subscription;
  record: CleaningRecord;

  constructor(private fb: FormBuilder, private collectionService: CollectionService,
    private popupService: PopupService) {
    this.popupTask$ = this.popupService.getPopupTask();
    this.filters$ = this.collectionService.getCollection('filters');
  }
  
  ngOnInit() {
    this.record$ = this.getRecord().subscribe((record)=> {
      this.record = record;
    });
    this.createForm();
  }
  ngOnDestroy() {
    this.record$.unsubscribe();
  }

  createForm() {
    this.formGroup = this.fb.group({
      id: [this.record['id'], Validators.required ],
      filter: [this.record['filter'], Validators.required ],
      currentEquipmentMeter: [this.record['currentEquipmentMeter'], Validators.required ],
      pre: [this.record['pre'], Validators.required ],
      post: [this.record['post'], Validators.required ],
      cycles: [this.record['cycles'], Validators.required ],
    });
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
  getRecord(): Observable<CleaningRecord> {
    return this.popupTask$
      .switchMap((task)=> {
        return task==='edit' ? this.collectionService.getSelectedItem() : Observable.of(<CleaningRecord>{
          id: '', filter: '', currentEquipmentMeter: null, pre: null, post: null, cycles: null, created: Date.now(), modified: Date.now()
        })
      })
  }
}