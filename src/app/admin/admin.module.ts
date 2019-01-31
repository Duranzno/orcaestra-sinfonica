import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialFireModule } from '../material.module';
import { AdminRoutingModule } from './admin-routing.module';
import { UploadComponent } from './upload/upload.component';
import { AdminComponent } from './admin.component';
import { UploadService } from '@core/services/upload.service';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core';
import { AlmacenamientoComponent, FileComponent, GenerosComponent, InstrumentosComponent, InvolucradosComponent } from '../core/components';
@NgModule({
  declarations: [
    AdminComponent,
    UploadComponent,
    AlmacenamientoComponent,
    FileComponent,
    GenerosComponent,
    InstrumentosComponent,
    InvolucradosComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialFireModule,
    FlexLayoutModule
  ],
  providers: [
    UploadService,
  ]
})
export class AdminModule { }
