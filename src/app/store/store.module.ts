import { NgModule, Optional, SkipSelf } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { RouterStoreModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';

import { reducer } from './reducers/index';

import { HttpEffectsService } from './effects/http.effects';
import { FiltersEffectsService } from './effects/filters.effects';

/**
 * @imports:
 *  StoreModule: https://github.com/ngrx/store
 *    This module is responsible for the coordnation of dispatched actions.
 *  RouterStoreModule: https://github.com/ngrx/router-store
 *    substitute for Angular 2's built in routing 
 *  EffectsModule: https://github.com/ngrx/effects
 *    Intercepts dispatched actions to store allowing finer control of store 
 *    interactions.
 */
@NgModule({
  imports: [
    StoreModule.provideStore(reducer),
    RouterStoreModule.connectRouter(),
    EffectsModule.run(HttpEffectsService),
    EffectsModule.run(FiltersEffectsService)
  ],
  providers: []
}) // Configure AppStoreModule to only load one time: error will throw if multiple instances occur
export class AppStoreModule {
  constructor (@Optional() @SkipSelf() parentModule: StoreModule) {
    if(parentModule) {
      throw new Error(
        'StoreModule is already loaded.  Import it in the AppModule only'
      );
    }
  }
}

/**
 * For more information on the prevention of reimporting modules:
 *  https://angular.io/docs/ts/latest/guide/ngmodule.html#!#core-module
 */