import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { YoutubePlayerModule } from 'ngx-youtube-player';
import { MusicListComponent } from './music-list/music-list.component';
import { MusicDetailComponent } from './music-list/music-detail.component';
import { MusicRoutingModule } from './music-routing.module';
import { ScoreComponent } from './score/score.component';

import { CardComponents } from './score/media-cards/';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared';
import { MusicComponent } from './music.component';

@NgModule({
  declarations: [
    MusicListComponent,
    MusicDetailComponent,
    ScoreComponent,
    MusicComponent,
    ...CardComponents,
  ],
  imports: [
    SharedModule,
    MusicRoutingModule,
    FormsModule,
    HttpClientModule,
    YoutubePlayerModule,
    StoreModule.forFeature('music2', {})
  ],
  // providers: [...APP_SERVICES],
})
export class MusicModule {
  constructor() { }

}
