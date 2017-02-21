import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'my-app',
  template: `
    <router-outlet></router-outlet>
  `
})
export class AppComponent  {
  appTitle: string = 'Starter';

  constructor(private titleService: Title) {
    this.setTitle(this.appTitle);
  }

  setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
}