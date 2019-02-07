import { NgModule, Optional, SkipSelf } from '@angular/core';

import { CoreStoreModule } from './store';
import { AppEffectsModules } from './effects';

import { APP_SERVICES } from './services';
import { APP_RESOLVERS } from './resolvers';
import { APP_CORE_COMPONENTS, FileUploadComponent } from './components';
import { APP_DIRECTIVES } from './directives';
import { CommonModule } from '@angular/common';
import { MaterialFireModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DropZoneDirective } from './directives/drop-zone.directive';

@NgModule({
  imports: [
    CommonModule,
    CoreStoreModule,
    ReactiveFormsModule,
    MaterialFireModule,
    AppEffectsModules
  ],
  exports: [CoreStoreModule,
    ...APP_CORE_COMPONENTS,
    ...APP_DIRECTIVES],
  providers: [...APP_SERVICES, ...APP_RESOLVERS],
  declarations: [
    ...APP_CORE_COMPONENTS,
    ...APP_DIRECTIVES,
  ]
})
export class CoreModule {
  // constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
  //   throwIfAlreadyLoaded(parentModule, 'CoreModule');
  // }
}
