import { NgModule, Optional, SkipSelf } from '@angular/core';

import { CoreStoreModule } from './store';
import { AppEffectsModules } from './effects';

import { APP_SERVICES } from './services';
import { APP_RESOLVERS } from './resolvers';
import { ReactiveFormsModule } from '@angular/forms';
import { FirebaseModule } from './firebase.module';
import { SharedModule } from '../shared';

@NgModule({
  imports: [
    SharedModule,
    CoreStoreModule,
    ReactiveFormsModule,
    AppEffectsModules,
    FirebaseModule,
  ],
  exports: [
    CoreStoreModule,
    ReactiveFormsModule,
  ],
  providers: [...APP_SERVICES, ...APP_RESOLVERS],
  declarations: [
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
function throwIfAlreadyLoaded(parentModule: any, moduleName: string) {
  if (parentModule) {
    throw new Error(`${moduleName} has already been loaded. Import Core modules in the AppModule only.`);
  }
}
