import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription} from 'rxjs/Subscription';

import { Equipment } from '../store/models/app.models';
import { isUniqueValidator } from '../shared/is-unique';
import { memberOfValidator } from '../shared/member-of';

import { CollectionService } from '../core/collection.service';
import { PopupService } from '../core/popup.service';

@Component({
  moduleId: module.id,
  templateUrl: './equipment-modify.component.html',
  styleUrls: ['../shared/form-modify.css']
})
export class EquipmentModifyComponent implements OnInit, OnDestroy{
  formGroup: FormGroup;
  task: string;
  equipment: Equipment;
  equipmentArray: string[];
  meterTypes: string[] = ['MILES', 'HOURS'];
  formErrors = {
    id: '',
    initialMeter: '',
    initialMeterPerGallon: '',
    meter: ''
  };
  validationMessages = {
    'id': {
      'required': 'ID is required',
      'isUnique': 'ID is not unique'
    },
    initialMeter: {
      'required': 'Initial Meter is required'
    },
    initialMeterPerGallon: {
      'required': 'Initial Meter Per Gallon is required'
    },
    meter: {
      'required': 'Equipment meter is required',
      'memberOf': 'Meter value does not exist'
    }
  };
  valueChanges$: Subscription;

  constructor(private fb: FormBuilder, private collectionService: CollectionService,
    private popupService: PopupService) {}
  
  ngOnInit() {
    this.popupService.getPopupTask()
      .subscribe((task)=>this.task=task).unsubscribe();

    this.ids('equipment')
      .subscribe((equipment)=>this.equipmentArray=equipment)
      .unsubscribe();

    this.getEquipment()
      .subscribe((equipment)=> {
        this.equipment = equipment;
      }).unsubscribe();

    this.createForm();
  }
  ngOnDestroy() {
    this.valueChanges$.unsubscribe();
  }

  createForm() {
    this.formGroup = this.fb.group({
      id: [
        this.equipment['id'], 
        Validators.compose([
          Validators.required,
          isUniqueValidator(this.equipmentArray)
        ])
      ],
      initialMeter: [
        this.equipment['initialMeter'], 
        Validators.required 
      ],
      initialMeterPerGallon: [
        this.equipment['initialMeterPerGallon'], 
        Validators.required 
      ],
      meter: [
        this.equipment['meter'], 
        Validators.compose([
          Validators.required,
          memberOfValidator(this.meterTypes)
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

  prepareSave(): Equipment {
    const formModel = this.formGroup.value;
    const saveModel: Equipment = {
      id: formModel.id,
      initialMeter: formModel.initialMeter,
      initialMeterPerGallon: formModel.initialMeterPerGallon,
      meter: formModel.meter
    }
    return saveModel;
  }

  getEquipment(): Observable<Equipment> {
    return this.task==='edit' ? this.collectionService.getSelectedItem() : Observable.of(<Equipment>{
      id: '', initialMeter: null, initialMeterPerGallon: null, meter: ''
    });
  }
  
  onSubmit(): void {
    this.collectionService.addEditItem(this.prepareSave(), 'equipment');
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