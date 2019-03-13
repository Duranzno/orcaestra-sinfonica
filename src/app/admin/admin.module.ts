import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { UploadComponent } from './upload/upload.component';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared';
import { ScoreManagementComponent } from './score-management/score-management.component';
@NgModule({
  declarations: [
    AdminComponent,
    UploadComponent,
    ScoreManagementComponent,
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
  constructor() { }

}
