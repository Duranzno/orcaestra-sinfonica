import { NgModule, Optional, SkipSelf } from '@angular/core';

import { CoreStoreModule } from './store';
import { AppEffectsModules } from './effects';

import { APP_SERVICES } from './services';
import { APP_RESOLVERS } from './resolvers';
import { APP_CORE_MODULES, FileUploadComponent } from './components';
import { APP_DIRECTIVES } from './directives';
import { DropZoneDirective } from './directives/drop-zone.directive';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, CoreStoreModule, AppEffectsModules],
  // declarations: [],
  exports: [CoreStoreModule],
  providers: [...APP_SERVICES, ...APP_RESOLVERS],
  declarations: []
})
export class CoreModule {
  // constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
  //   throwIfAlreadyLoaded(parentModule, 'CoreModule');
  // }
}
