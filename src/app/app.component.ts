import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';

import * as fromRoot from './store/reducers/index';
/**
 * AppComponent:
 *  @_template:
 *    router-outlet:  All child modules and components of the app will display here
 */
@Component({
  selector: 'app',
  template: `
    <router-outlet></router-outlet>
  `
})
export class AppComponent implements OnInit {
  appTitle: string = 'Http Starter App';
  
  // get title service from AppModule provider
  constructor(private titleService: Title, private store: Store<fromRoot.State>) {}

  // when init cycle begins: set application title to this.appTitle
  ngOnInit() {
    this.setTitle(this.appTitle);
    this.store.dispatch({type: '[Http] Get All', payload: {collection: 'filters'}}); // relocate to init effect/reducer
  }

  // helper function used to set application title
  setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
}