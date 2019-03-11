import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { IScore, Score, MediaType } from 'src/app/core/models';
import { Observable, from, of } from 'rxjs';
import { map, switchMap, tap, pluck } from 'rxjs/operators';
import { YoutubeService } from '../services';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { OrcaState, From } from 'src/app/core/store';

class MediaBuffer {
  constructor(
    public avatar: string = '',
    public pdf: string = '',
    public img: string = '',
    public mxml: string = '',
    public mp3: string = '',
    public youtube: string = '') { }
}
@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styles: []
})
export class ScoreComponent implements OnInit {
  score$: Observable<IScore>; // : Score = new Score({ obra: '', its: -1, almacenamiento: [] });;
  mediaType = MediaType;

  constructor(
    private afs: AngularFirestore,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<OrcaState>
  ) { }
  ngOnInit() {
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.store.dispatch(
          new From.media.FetchScore(<string>params.get('uid'))
        );
      });
    this.score$ = this.store.select(From.music.getPartitura);
  }
}
