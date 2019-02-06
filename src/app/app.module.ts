import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { YoutubePlayerModule } from 'ngx-youtube-player';
import { PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { CoreModule } from './core';

import { MaterialFireModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav/sidenav-list.component';
import { SidenavItemComponent } from './navigation/sidenav/sidenav-item.component';

import { MusicListComponent } from './list/music-list/music-list.component';
import { MusicDetailComponent } from './list/music-details/music-detail.component';
import { SheetComponent } from './sheet/sheet.component';

import { environment } from '../environments/environment';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { FileUploadComponent } from './core/components';
import { DropZoneDirective } from './core/directives/drop-zone.directive';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
@NgModule({
  declarations: [
    DropZoneDirective,
    FileUploadComponent,
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
    SidenavItemComponent,
    MusicListComponent,
    MusicDetailComponent,
    SheetComponent,
  ],
  imports: [
    AuthModule,
    CoreModule,
    AdminModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    MaterialFireModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    YoutubePlayerModule,
    PerfectScrollbarModule,
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
  ],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
