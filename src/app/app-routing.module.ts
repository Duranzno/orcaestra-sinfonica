import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { SheetComponent } from './sheet/sheet.component';
import { SettingsComponent } from './auth/settings/settings.component';
import { MusicDetailComponent } from './list/music-detail.component';
import { MusicListComponent } from './list/music-list.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'sheet', component: SheetComponent },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: 'music-detail', component: MusicDetailComponent, canActivate: [AuthGuard] },
  { path: 'music-list', component: MusicListComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
