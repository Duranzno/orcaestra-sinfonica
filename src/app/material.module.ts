import { NgModule, Optional, SkipSelf } from '@angular/core';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';

import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import {
  MatChipsModule,
  MatButtonModule,
  MatIconModule,
  MatAutocompleteModule,
  MatFormFieldModule,
  MatInputModule,
  MatCheckboxModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatTabsModule,
  MatCardModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatSnackBarModule,
  MatSliderModule,
  MatStepperModule,
  MatGridListModule,
  MatProgressBarModule,
  MatExpansionModule,
} from '@angular/material';

const material = [
  // Angular
  AngularFireAuthModule,
  AngularFirestoreModule,
  AngularFireFunctionsModule,
  AngularFireMessagingModule,
  AngularFireStorageModule,
  // Material
  MatChipsModule,
  MatStepperModule,
  MatProgressBarModule,
  MatAutocompleteModule,
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatSliderModule,
  MatCheckboxModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatTabsModule,
  MatCardModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatSnackBarModule,
  MatGridListModule,
  MatExpansionModule,
];
@NgModule({
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    ...material],
  exports: material,
})
export class MaterialFireModule {
  constructor(@Optional() @SkipSelf() parentModule: MaterialFireModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
    console.log('firebase material module');
  }

}
export function throwIfAlreadyLoaded(parentModule: any, moduleName: string) {
  if (parentModule) {
    throw new Error(`${moduleName} has already been loaded. Import Core modules in the AppModule only.`);
  }
}
