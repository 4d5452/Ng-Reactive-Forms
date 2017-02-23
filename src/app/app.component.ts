import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

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
  constructor(private titleService: Title) {}

  // when init cycle begins: set application title to this.appTitle
  ngOnInit() {
    this.setTitle(this.appTitle);
  }

  // helper function used to set application title
  setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
}