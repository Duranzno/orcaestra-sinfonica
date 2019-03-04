import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { SheetComponent } from './sheet/sheet.component';
import { AuthGuard } from './auth/auth.guard';
import { environment } from 'src/environments/environment';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: 'welcome',
    component: WelcomeComponent
  },
  {
    path: 'sheet',
    component: SheetComponent
  },
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule',
    // canActivate: [AuthGuard]
  },
  {
    path: 'music-list',
    loadChildren: './music/music.module#MusicModule',
    // canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // enableTracing: !environment.production, // <-- debugging purposes only
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
