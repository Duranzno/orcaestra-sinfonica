import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialFireModule } from '../material.module';
import { MusicListComponent } from './music-list/music-list.component';
import { MusicDetailComponent } from './music-details/music-detail.component';
import { MusicRoutingModule } from './music-routing.module';
import { CoreModule } from '../core';

@NgModule({
  declarations: [
    MusicListComponent,
    MusicDetailComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    MusicRoutingModule,
    FormsModule,
    MaterialFireModule,
    FlexLayoutModule,
  ],
  providers: []
})
export class MusicModule { }
