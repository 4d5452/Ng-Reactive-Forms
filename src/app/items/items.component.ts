import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ItemsService } from './items.service';
import { Item } from '../store/models/items.models';

@Component({
  selector: 'items',
  template: `
    <div>
      <li *ngFor="let item of items$ | async">
        <span>{{item.id}}</span>
        <span>{{item.type}}</span>
      </li>
    </div>
    <button (click)="getAll()">Get All</button>
    <button (click)="get()">Get</button>
    <button (click)="add()">Add</button>
    <button (click)="remove()">Remove</button>
    <button (click)="update()">Update</button>
    <router-outlet></router-outlet>
  `
})
export class ItemsComponent implements OnInit {
  items$: Observable<Item[]>;
  count: number = 0; //Used to test update...
  constructor(private itemsService: ItemsService) {}

  ngOnInit() {
    this.items$ = this.itemsService.getItemsCollection();
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
    this.itemsService.update(12, {id: 12, type: 'GPU' + this.count});
    this.count = this.count + 1;
  }
}