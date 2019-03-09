import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';

import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UploadComponent } from './upload/upload.component';
import { AdminComponent } from './admin.component';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared';
@NgModule({
  declarations: [
    AdminComponent,
    UploadComponent,
  ],
  imports: [
    SharedModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
  ]
})
export class AdminModule {
  constructor() { console.log('admin module'); }

}
