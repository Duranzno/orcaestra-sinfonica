import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScoreComponent } from './score/score.component';
import { MusicComponent } from './music.component';

const routes: Routes = [
  { path: 'lista', component: MusicComponent },
  { path: 'partitura', component: ScoreComponent },
  { path: 'partitura/:uid', component: ScoreComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MusicRoutingModule {
  constructor() { }

}
