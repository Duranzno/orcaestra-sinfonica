import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CoreModule } from '../core';
import { YoutubePlayerModule } from 'ngx-youtube-player';

import { MusicListComponent } from './music-list/music-list.component';
import { MusicDetailComponent } from './music-list/music-detail.component';
import { MusicRoutingModule } from './music-routing.module';
import { ScoreComponent } from './score/score.component';

import { MediaCardComponent } from './score/media-cards/media.card.component';
import { YoutubeComponent } from './score/media-cards/youtube.component';
import { Mp3Component } from './score/media-cards/mp3.component';
import { MidiComponent } from './score/media-cards/midi.component';
import { PdfComponent } from './score/media-cards/pdf.component';
import { MxmlComponent } from './score/media-cards/mxml.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    MusicListComponent,
    MusicDetailComponent,
    ScoreComponent,
    MediaCardComponent,
    YoutubeComponent,
    Mp3Component,
    MidiComponent,
    PdfComponent,
    MxmlComponent,
  ],
  imports: [
    CoreModule,
    MusicRoutingModule,
    FormsModule,
    HttpClientModule,
    ,
    YoutubePlayerModule,
  ],
  // providers: [...APP_SERVICES],
})
export class MusicModule {
  constructor() { console.log('music module'); }

}
