import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app',
  template: `
    <router-outlet></router-outlet>
  `
})
export class AppComponent  {
  appTitle: string = 'Http Starter App';

  constructor(private titleService: Title) {
    this.setTitle(this.appTitle);
  }

  setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
}