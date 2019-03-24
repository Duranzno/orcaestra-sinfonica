import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { UploadComponent } from './upload/upload.component';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared';
import { ScoreManagementComponent } from './score-management/score-management.component';
import { CategoriesManagementComponent, DialogoCategoria } from './categories-management/categories-management.component';
import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';

import { MediaInputComponent } from './media-input/media-input.component';
import { CameraComponent } from './media-input/camera.component';
import { AudioComponent } from './media-input/audio.component';
import { PdfService } from './media-input/pdf/pdf.service';
@NgModule({
  declarations: [
    AdminComponent,
    UploadComponent,
    ScoreManagementComponent,
    CategoriesManagementComponent,
    DialogoCategoria,
    MediaInputComponent,
    CameraComponent,
    AudioComponent,
  ],
  entryComponents: [DialogoCategoria],
  imports: [
    SharedModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  providers: [PdfService]
})
export class AdminModule {
  constructor() { }

}
