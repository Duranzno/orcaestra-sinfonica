import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { MaterialFireModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { MusicListComponent } from './list/music-list/music-list.component';
import { MusicDetailComponent } from './list/music-details/music-detail.component';
import { SheetComponent } from './sheet/sheet.component';

import { UIService } from './shared/ui.service';
import { AuthService } from './auth/auth.service';
import { UploadService } from './admin/upload.service';

import { environment } from '../environments/environment';
import { reducers } from './app.reducer';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { MusicService } from './list/music.service';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
    MusicListComponent,
    MusicDetailComponent,
    SheetComponent,
  ],
  imports: [
    AuthModule,
    AdminModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialFireModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production}),
    AngularFireModule.initializeApp(environment.firebase),
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [
    AuthService,
    UIService,
    MusicService,
    UploadService
  ],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
