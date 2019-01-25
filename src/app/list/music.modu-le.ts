import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';

import { MaterialFireModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { MusicListComponent } from './music-list/music-list.component';
import { MusicDetailComponent } from './music-details/music-detail.component';
import { MusicRoutingModule } from './music-routing.module';
import { musicReducer } from './redux/music.reducer';

// @NgModule({
//   declarations: [
//     MusicListComponent,
//     MusicDetailComponent,
//   ],
//   imports: [
//     CommonModule,
//     SharedModule,
//     FlexLayoutModule,
//     MaterialFireModule,
//     MusicRoutingModule,
//   ],
//   entryComponents: []
// })
export class MusicModule { }
