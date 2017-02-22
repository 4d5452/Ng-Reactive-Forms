import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ItemsService } from './items.service';

@Component({
  selector: 'items',
  template: `
    <button (click)="getAll()">Get All</button>
    <button (click)="get()">Get</button>
    <button (click)="add()">Add</button>
    <button (click)="remove()">Remove</button>
    <button (click)="update()">Update</button>
  `
})
export class ItemsComponent implements OnInit {
  constructor(private itemsService: ItemsService) {}

  ngOnInit() {

  }

  getAll() {
    this.itemsService.getAll();
  }
  get(){
    this.itemsService.get(3);
  }
  add(){
    this.itemsService.add({id: 11, type: 'Outlet'});
  }
  remove() {
    this.itemsService.remove(4);
  }
  update() {
    this.itemsService.update(12, {id: 12, type: 'GPU'});
  }
}