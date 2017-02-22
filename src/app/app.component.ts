import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app',
  template: `
    <router-outlet></router-outlet>
  `
})
export class AppComponent implements OnInit {
  appTitle: string = 'Http Starter App';

  constructor(private titleService: Title) {}

  ngOnInit() {
    this.setTitle(this.appTitle);
  }

  setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
}