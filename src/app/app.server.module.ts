import { NgModule, Injectable, ReflectiveInjector } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { AppShellComponent } from './app-shell/app-shell.component';
import { SERVER_DI_CONFIG, APP_CONFIG } from './app.config';

const routes: Routes = [
  // { path: 'app-shell-path', component: AppShellComponent }
];
declare const global;
@Injectable()
class AppShellResolver {
  window = false;
}

const injector = ReflectiveInjector.resolveAndCreate([
  AppShellResolver,  // Shorthand for { provide: Greeting, useClass: Greeting }
]);

global['navigator'] = {};
@NgModule({
  imports: [
    AppModule,
    ServerModule,
    RouterModule.forRoot(routes),
  ],
  bootstrap: [AppComponent],
  providers: [{ provide: APP_CONFIG, useValue: SERVER_DI_CONFIG }],
  declarations: [AppShellComponent],
})
export class AppServerModule { }
