import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { MusicListComponent } from './music/music-list/music-list.component';
import { MusicDetailComponent } from './music/music-detail/music-detail.component';
import { SettingsComponent } from './auth/settings/settings.component';
import { AdminComponent } from './admin/admin.component';
import { UploadComponent } from './admin/upload/upload.component';

import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
	{ path:''		,component:WelcomeComponent},
	{ path:'signup'				,component:SignupComponent},
	{ path:'login'				,component:LoginComponent},
	{ path:'settings' 		,component:SettingsComponent},	
	{ path:'music-detail'	,component:MusicDetailComponent},
	{ path:'music-list'		,component:MusicListComponent},	
	{ path:'upload'				,component:UploadComponent},
	{ path:'admin'				,component:AdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  // providers: [AuthGuard]
})
export class AppRoutingModule { }
