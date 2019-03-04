import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CoreModule } from '../core';
import { YoutubePlayerModule } from 'ngx-youtube-player';
import { MaterialFireModule } from '../material.module';

import { MusicListComponent } from './music-list/music-list.component';
import { MusicDetailComponent } from './music-list/music-detail.component';
import { MusicRoutingModule } from './music-routing.module';
import { ScoreComponent } from './score/score.component';
import { APP_SERVICES } from './services';
import { MediaCardComponent } from './score/media.card.component';

@NgModule({
  declarations: [
    MusicListComponent,
    MusicDetailComponent,
    ScoreComponent,
    MediaCardComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    MusicRoutingModule,
    FormsModule,
    MaterialFireModule,
    FlexLayoutModule,
    YoutubePlayerModule,
  ],
  // providers: [...APP_SERVICES],
})
export class MusicModule { }
