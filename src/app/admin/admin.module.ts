import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { UploadComponent } from './upload/upload.component';
import { SharedModule } from '../shared';
import { ScoreManagementComponent } from './score-management/score-management.component';
import { CategoriesManagementComponent, DialogoCategoria } from './categories-management/categories-management.component';
import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';

@NgModule({
  declarations: [
    UploadComponent,
    ScoreManagementComponent,
    CategoriesManagementComponent,
    DialogoCategoria,
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
  providers: [
    // { provide: Window, useValue: (window)?window:null }
  ]
})
export class AdminModule {
  constructor() { }

}
