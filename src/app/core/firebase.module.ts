import { NgModule, Optional, SkipSelf } from '@angular/core';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';

import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment.prod';


const firebase = [
  AngularFireAuthModule,
  AngularFirestoreModule,
  AngularFireFunctionsModule,
  AngularFireMessagingModule,
  AngularFireStorageModule,
];
@NgModule({
  imports: [
    AngularFireModule.initializeApp(environment.firebase)],
  providers: [{ provide: FirestoreSettingsToken, useValue: {} }],
  exports: [...firebase]
})
export class FirebaseModule {
  constructor(@Optional() @SkipSelf() parentModule: FirebaseModule) {
    throwIfAlreadyLoaded(parentModule, 'FirebaseModule');

  }

}
function throwIfAlreadyLoaded(parentModule: any, moduleName: string) {
  if (parentModule) {
    throw new Error(`${moduleName} has already been loaded. Import Core modules in the AppModule only.`);
  }
}
