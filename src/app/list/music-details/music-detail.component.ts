import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { MediaType, MediaOriginType, IScore, Score } from '@core/models';
import { MusicService } from '@core/services/music.service';

import * as fromMusic from '@core/store/music';
import { mockSheet } from '../../shared/mock';
import { OrcaState } from '../../core/store';

@Component({
  selector: 'app-music-detail',
  templateUrl: './music-detail.component.html',
  styleUrls: ['./music-detail.component.scss']
})
export class MusicDetailComponent implements OnInit {
  mockData$: Observable<IScore>;
  mockData: Score = mockSheet;
  media: { avatar: string; sheet: string; } = { avatar: '', sheet: '' };

  constructor(
    private musicService: MusicService,
    private store: Store<OrcaState>) { }

  ngOnInit() {
    this.mockData$ = this.store.select(fromMusic.getPartitura);
    // this.store.select(fromMusic.getPartitura).subscribe(
    //   (sheet: IScore) => { console.log(sheet); });
    // this.media.photoUrl = this.mockData.media.getByTypeAndOrigin(MediaType.AVATAR, MediaOriginType.ASSETS).url;
    this.media.avatar = this.mockData.media.getByTypeAndOrigin(MediaType.AVATAR, MediaOriginType.ASSETS).url;
    this.media.sheet = this.mockData.media.getByTypeAndOrigin(MediaType.IMG, MediaOriginType.ASSETS).url;

    console.log(this.media);

  }
  log(g) {
    console.log(g);
  }
}
