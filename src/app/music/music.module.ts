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

@NgModule({
  declarations: [
    MusicListComponent,
    MusicDetailComponent,
    ScoreComponent,
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
  providers: []
})
export class MusicModule { }
