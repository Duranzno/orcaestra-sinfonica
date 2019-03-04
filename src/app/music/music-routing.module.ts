import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MusicListComponent } from './music-list/music-list.component';
import { ScoreComponent } from './score/score.component';

const routes: Routes = [
  { path: '', component: MusicListComponent },
  { path: 'score', component: ScoreComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MusicRoutingModule { }
