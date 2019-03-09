import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { MediaType, OriginType, IScore, Score } from '../../core/models';

import { From, OrcaState } from '../../core/store';
import { iScore } from 'src/app/core/mock';

@Component({
  selector: 'app-music-detail',
  templateUrl: './music-detail.component.html',
  styleUrls: ['./music-detail.component.scss']
})
export class MusicDetailComponent implements OnInit {
  mockData$: Observable<IScore>;
  mockData: Score = new Score(iScore);
  media: { avatar: string; sheet: string; } = { avatar: '', sheet: '' };

  constructor(
    // private musicService: MusicService,
    private store: Store<OrcaState>
  ) { }

  ngOnInit() {
    this.mockData$ = this.store.select(From.music.getPartitura);
    // this.store.select(fromMusic.getPartitura).subscribe(
    //   (sheet: IScore) => { console.log(sheet); });
    // this.media.photoUrl = this.mockData.media.getByTypeAndOrigin(MediaType.AVATAR, OriginType.ASSETS).url;
    // this.media.avatar = this.mockData.media.getByTypeAndOrigin(MediaType.AVATAR, OriginType.ASSETS).url;
    // this.media.sheet = this.mockData.media.getByTypeAndOrigin(MediaType.IMG, OriginType.ASSETS).url;

    console.log(this.media);

  }
  log(g) {
    console.log(g);
  }
}
