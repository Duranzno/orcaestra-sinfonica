
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { UploadComponent } from './upload/upload.component';
import { ScoreManagementComponent } from './score-management/score-management.component';


const routes: Routes = [
  { path: '', redirectTo: 'main' },
  { path: 'carga', component: UploadComponent },
  { path: 'partitura', component: ScoreManagementComponent },
  { path: 'main', component: AdminComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
  constructor() { }

}
