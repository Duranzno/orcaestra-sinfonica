import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MusicListComponent } from './music-list/music-list.component';
import { ScoreComponent } from './score/score.component';

const routes: Routes = [
  { path: 'lista', component: MusicListComponent },
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
