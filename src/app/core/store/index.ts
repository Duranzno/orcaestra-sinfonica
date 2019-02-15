import { NgModule } from '@angular/core';
import { Store, StoreModule, ActionReducer, MetaReducer } from '@ngrx/store';
import { OrcaActions, OrcaState, OrcaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppEffectsModules } from '../effects';
const optionalImports = [];

// if (!environment.production) {
//   // Note that you must instrument after importing StoreModule
//   optionalImports.push(StoreDevtoolsModule.instrument({ maxAge: 25 }));
// }

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forRoot(OrcaReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      // logOnly: environment.production, // Restrict extension to log-only mode
    }),
    AppEffectsModules,
  ],
  exports: [
  ],
  providers: [...OrcaActions],
})
export class CoreStoreModule { }
export { OrcaState, OrcaActions, OrcaReducers } from './reducers';
import * as media from './media';
import * as auth from './auth';
import * as music from './music';
import * as ui from './ui';
export const from = { media, auth, music, ui };

