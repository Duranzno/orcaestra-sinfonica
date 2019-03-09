import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { AuthGuard } from './auth/auth.guard';
import { environment } from 'src/environments/environment';
import { PageNotFoundComponent } from './welcome/page-not-found/page-not-found.component';

const routes: Routes = [
  // {
  //   path: 'login',
  //   redirectTo: 'auth/login',
  // },
  // {
  //   path: 'logout',
  //   redirectTo: 'auth/logout',
  // },
  // {
  //   path: 'signup',
  //   redirectTo: 'auth/signup',
  // },
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'music-list',
    loadChildren: './music/music.module#MusicModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule',
    // canActivate: [AuthGuard]
  },
  {
    path: 'welcome',
    component: WelcomeComponent
  },
  {
    path: '',
    redirectTo: '/welcome',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // enableTracing: !environment.production, // <-- debugging purposes only
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {
  constructor() { console.log('app routing module'); }

}
