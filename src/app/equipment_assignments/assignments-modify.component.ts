import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription} from 'rxjs/Subscription';

import { EquipmentAssignment, Equipment, Filter } from '../store/models/app.models';

import { CollectionService } from '../core/collection.service';
import { PopupService } from '../core/popup.service';

@Component({
  moduleId: module.id,
  templateUrl: './assignments-modify.component.html',
  styleUrls: ['../shared/form-modify.css']
})
export class EquipmentAssignmentsModifyComponent implements OnInit, OnDestroy{
  formGroup: FormGroup;
  popupTask$: Observable<string>;

  equipmentAssignment$: Subscription;
  equipmentAssignment: EquipmentAssignment;

  equipment$: Observable<Equipment[]>;
  filters$: Observable<Filter[]>;

  bool: string[] = ['TRUE', 'FALSE'];

  constructor(private fb: FormBuilder, private collectionService: CollectionService,
    private popupService: PopupService) {
    this.popupTask$ = this.popupService.getPopupTask();
    this.equipment$ = this.collectionService.getCollection('equipment');
    this.filters$ = this.collectionService.getCollection('filters');
  }
  
  ngOnInit() {
    this.equipmentAssignment$ = this.getEquipmentAssignment().subscribe((equipmentAssignment)=> {
      this.equipmentAssignment = equipmentAssignment;
    });
    this.createForm();
  }
  ngOnDestroy() {
    this.equipmentAssignment$.unsubscribe();
  }

  createForm() {
    this.formGroup = this.fb.group({
      id: [this.equipmentAssignment['id'], Validators.required ],
      equipment: [this.equipmentAssignment['equipment'], Validators.required ],
      filter: [this.equipmentAssignment['filter'], Validators.required ],
      active: [this.equipmentAssignment['active'], Validators.required ]
    });
  }

  onSubmit(): void {
    this.collectionService.addEditItem(this.prepareSave(), 'assignments');
    this.popupService.closePopup();
  }

  prepareSave(): EquipmentAssignment {
    const formModel = this.formGroup.value;
    const saveModel: EquipmentAssignment = {
      id: formModel.id,
      equipment: formModel.equipment,
      filter: formModel.filter,
      active: formModel.active==='TRUE' ? true : false
    }
    return saveModel;
  }
  getEquipmentAssignment(): Observable<EquipmentAssignment> {
    return this.popupTask$
      .switchMap((task)=> {
        return task==='edit' ? this.collectionService.getSelectedItem() : Observable.of(<EquipmentAssignment>{
          id: '', equipment: '', filter: '', active: null
        })
      })
  }
}