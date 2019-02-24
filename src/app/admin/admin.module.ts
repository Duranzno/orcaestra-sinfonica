import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialFireModule } from '../material.module';
import { AdminRoutingModule } from './admin-routing.module';
import { UploadComponent } from './upload/upload.component';
import { AdminComponent } from './admin.component';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core';
@NgModule({
  declarations: [
    AdminComponent,
    UploadComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialFireModule,
    FlexLayoutModule
  ],
  providers: [
  ]
})
export class AdminModule { }
