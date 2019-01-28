import { NgModule, Optional, SkipSelf } from '@angular/core';

import { CoreStoreModule } from './store';
import { AppEffectsModules } from './effects';

import { APP_SERVICES } from './services';
import { APP_RESOLVERS } from './resolvers';

@NgModule({
  imports: [CoreStoreModule, AppEffectsModules],
  declarations: [],
  exports: [CoreStoreModule],
  providers: [...APP_SERVICES, ...APP_RESOLVERS]
})
export class CoreModule {
  // constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
  //   throwIfAlreadyLoaded(parentModule, 'CoreModule');
  // }
}
