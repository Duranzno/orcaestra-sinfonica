import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { UploadComponent } from './upload/upload.component';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared';
import { ScoreManagementComponent } from './score-management/score-management.component';
import { CategoriesManagementComponent } from './categories-management/categories-management.component';
import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
@NgModule({
  declarations: [
    AdminComponent,
    UploadComponent,
    ScoreManagementComponent,
    CategoriesManagementComponent,
  ],
  imports: [
    SharedModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  providers: [
  ]
})
export class AdminModule {
  constructor() { }

}
