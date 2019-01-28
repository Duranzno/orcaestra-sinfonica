import { Component, OnInit } from '@angular/core';
import { IScore, Score } from '../../shared/models/partitura.interface';
import { IStoredType } from '../../shared/models/almacenamiento.interface';
import { PersonaTipo } from '../../shared/models/autor.interface';
import { MusicService } from '../music.service';
import { Store } from '@ngrx/store';

import * as fromMusic from '../redux/music.reducer';
import { Observable } from 'rxjs';
import { mockSheet } from '../../shared/mock';
import { MediaType, MediaOriginType } from '../../shared/models/multimedia.interface';

@Component({
  selector: 'app-music-detail',
  templateUrl: './music-detail.component.html',
  styleUrls: ['./music-detail.component.scss']
})
export class MusicDetailComponent implements OnInit {
  mockData$: Observable<IScore>;
  mockData: Score = mockSheet;
  media: { avatar: string; sheet: string; } = { avatar: '', sheet: '' };
  constructor(private musicService: MusicService, private store: Store<fromMusic.State>) { }

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
