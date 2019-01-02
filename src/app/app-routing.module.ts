import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { MusicListComponent } from './list/music-list.component';
import { MusicDetailComponent } from './list/music-detail.component';
import { SettingsComponent } from './auth/settings/settings.component';
import { AdminComponent } from './admin/admin.component';
import { UploadComponent } from './admin/upload/upload.component';
import { SheetComponent } from './sheet/sheet.component';

import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
	{ path: '', component: WelcomeComponent },
	{ path: 'signup', component: SignupComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'sheet', component: SheetComponent },
	{ path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
	{ path: 'music-detail', component: MusicDetailComponent, canActivate: [AuthGuard] },
	{ path: 'music-list', component: MusicListComponent, canActivate: [AuthGuard] },
	{ path: 'upload', component: UploadComponent, canActivate: [AuthGuard] },
	{ path: 'admin', component: AdminComponent },

];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	providers: [AuthGuard]
})
export class AppRoutingModule { }
