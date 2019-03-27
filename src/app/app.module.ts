import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable, ReflectiveInjector } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { CoreModule } from './core';

import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav/sidenav.component';
import { SidenavItemComponent } from './navigation/sidenav/sidenav.item.component';


import { environment } from '../environments/environment';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageNotFoundComponent } from './welcome/page-not-found/page-not-found.component';
import { SharedModule } from './shared';
import { HttpModule } from '@angular/http';
import { APP_CONFIG, APP_DI_CONFIG, SERVER_DI_CONFIG } from './app.config';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
@Injectable()
export class AppShellResolver {
  window = true;
}

const injector = ReflectiveInjector.resolveAndCreate([
  AppShellResolver,  // Shorthand for { provide: Greeting, useClass: Greeting }
]);
@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
    SidenavItemComponent,
    PageNotFoundComponent,
  ],
  imports: [
    // Angular
    CoreModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    RouterModule,
    HttpModule,
    // Libraries
    AppRoutingModule,
    // ServiceWorkerModule.register('/firebase-messaging-sw.js'),
    ServiceWorkerModule.register('/combined-worker.js',
      { enabled: environment.production }
    ),
    PerfectScrollbarModule,
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    { provide: APP_CONFIG, useValue: APP_DI_CONFIG }
  ],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule {
  constructor() { }
}
