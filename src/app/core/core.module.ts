import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpModule } from '@angular/http';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AppData } from './in-memory-data.service';

import { MaterialModule } from '@angular/material';
import 'hammerjs';

import { ApiService } from './http/api.service';
import { RequestOptionsService } from './http/request-options.service';

import { HttpService } from './http.service';
import { HttpCollectionService } from './http-collection.service';
import { CollectionService } from './collection.service';
import { TableService } from './table.service';
import { PopupService } from './popup.service';
import { PopupGuardService } from './popup-guard.service';

@NgModule({
  imports: [ 
    HttpModule,
    InMemoryWebApiModule.forRoot(AppData),
    MaterialModule.forRoot()
  ],
  declarations: [],
  exports: [ 
    InMemoryWebApiModule,
    MaterialModule
 ],
  providers: [
    ApiService,
    RequestOptionsService,
    HttpService,
    HttpCollectionService,
    CollectionService,
    TableService,
    PopupService,
    PopupGuardService
  ]
})

export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if(parentModule) {
      throw new Error(
        'CoreModule is already loaded.  Import it in the AppModule only'
      );
    }
  }
}