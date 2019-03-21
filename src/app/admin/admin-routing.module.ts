
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { UploadComponent } from './upload/upload.component';
import { ScoreManagementComponent } from './score-management/score-management.component';
import { CategoriesManagementComponent } from './categories-management/categories-management.component';


const routes: Routes = [
  { path: '', redirectTo: 'partitura' },
  { path: 'carga', component: UploadComponent },
  { path: 'partitura', component: ScoreManagementComponent },
  { path: 'main', component: AdminComponent },
  { path: 'categorias', component: CategoriesManagementComponent },
  { path: 'categorias/:tipo', component: CategoriesManagementComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
  constructor() { }

}
