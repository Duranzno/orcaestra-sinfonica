import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SettingsComponent } from './settings/settings.component';
import { CoreModule } from '../core';
import { LogoutComponent } from './logout.component';

import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared';
@NgModule({
  declarations: [SignupComponent, LoginComponent, SettingsComponent, LogoutComponent],
  imports: [

    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
  ]
})
export class AuthModule {
  constructor() { console.log('authmodule'); }

}
