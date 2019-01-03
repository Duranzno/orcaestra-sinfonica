import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { MusicListComponent } from './list/music-list.component';
import { MusicDetailComponent } from './list/music-detail.component';
import { SettingsComponent } from './auth/settings/settings.component';
import { AdminComponent } from './admin/admin.component';
import { UploadComponent } from './admin/upload/upload.component';
import { SheetComponent } from './sheet/sheet.component';

import { UIService } from './shared/ui.service';
import { AuthService } from './auth/auth.service';

import { environment } from '../environments/environment';
import { InvolucradosComponent } from './shared/involucrados.component';
import { AlmacenamientoComponent } from './shared/almacenamiento.component';
import { GenerosComponent } from './shared/generos.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    SidenavListComponent,
    MusicListComponent,
    MusicDetailComponent,
    SettingsComponent,
    AdminComponent,
    UploadComponent,
    SheetComponent,
    InvolucradosComponent,
    AlmacenamientoComponent,
    GenerosComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [
    AuthService,
    UIService,

   ],

  bootstrap: [AppComponent],
  entryComponents:[]
})
export class AppModule { }
