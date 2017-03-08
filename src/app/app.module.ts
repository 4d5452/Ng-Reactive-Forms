import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppStoreModule } from './store/store.module';
import { CoreModule } from './core/core.module';

import { DashboardModule } from './dashboard/dashboard.module';
import { RecordsModule } from './records/records.module';

import { PageNotFoundComponent } from './page-not-found.component';


@NgModule({
  imports:      [ 
    BrowserModule,
    CoreModule,
    AppStoreModule,
    DashboardModule,
    AppRoutingModule,
    RecordsModule
 ],
  declarations: [ 
    AppComponent ,
    PageNotFoundComponent
  ],
  providers: [ Title ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }