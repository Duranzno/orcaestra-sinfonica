import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MusicListComponent } from './music-list/music-list.component';
import { ScoreComponent } from './score/score.component';

const routes: Routes = [
  { path: 'list', component: MusicListComponent },
  { path: 'score', component: ScoreComponent },
  { path: 'test/:uid', component: ScoreComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MusicRoutingModule {
  constructor() { console.log('music routing module'); }

}
