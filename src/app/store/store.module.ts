import { NgModule, Optional, SkipSelf } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { RouterStoreModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';

import { reducer } from './reducers/index';

import { HttpEffectsService } from './effects/http.effects';

@NgModule({
  imports: [
    StoreModule.provideStore(reducer),
    RouterStoreModule.connectRouter(),
    EffectsModule.run(HttpEffectsService)
  ],
  providers: []
})
export class AppStoreModule {
  constructor (@Optional() @SkipSelf() parentModule: StoreModule) {
    if(parentModule) {
      throw new Error(
        'StoreModule is already loaded.  Import it in the AppModule only'
      );
    }
  }
}