import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription} from 'rxjs/Subscription';

import { Equipment } from '../store/models/app.models';

import { CollectionService } from '../core/collection.service';
import { PopupService } from '../core/popup.service';

@Component({
  moduleId: module.id,
  templateUrl: './equipment-modify.component.html',
  styleUrls: ['../shared/form-modify.css']
})
export class EquipmentModifyComponent implements OnInit, OnDestroy{
  formGroup: FormGroup;
  popupTask$: Observable<string>;

  equipment$: Subscription;
  equipment: Equipment;

  meterTypes: string[] = ['MILES', 'HOURS'];

  constructor(private fb: FormBuilder, private collectionService: CollectionService,
    private popupService: PopupService) {
    this.popupTask$ = this.popupService.getPopupTask();
  }
  
  ngOnInit() {
    this.equipment$ = this.getEquipment().subscribe((equipment)=> {
      this.equipment = equipment;
    });
    this.createForm();
  }
  ngOnDestroy() {
    this.equipment$.unsubscribe();
  }

  createForm() {
    this.formGroup = this.fb.group({
      id: [this.equipment['id'], Validators.required ],
      initialMeter: [this.equipment['initialMeter'], Validators.required ],
      initialMeterPerGallon: [this.equipment['initialMeterPerGallon'], Validators.required ],
      meter: [this.equipment['meter'], Validators.required ]
    });
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
    return this.popupTask$
      .switchMap((task)=> {
        return task==='edit' ? this.collectionService.getSelectedItem() : Observable.of(<Equipment>{
          id: '', initialMeter: null, initialMeterPerGallon: null, meter: ''
        })
      })
  }
  
  onSubmit(): void {
    this.collectionService.addEditItem(this.prepareSave(), 'equipment');
    this.popupService.closePopup();
  }
  onCancel(): void {
    this.formGroup.reset();
    this.popupService.closePopup();
  }
}