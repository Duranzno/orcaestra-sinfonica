import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { IScore, Score, MediaType } from 'src/app/core/models';
import { Observable, from, of } from 'rxjs';
import { map, switchMap, tap, pluck } from 'rxjs/operators';
import { YoutubeService } from '../services';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

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
  score$: Observable<Score>; // : Score = new Score({ obra: '', its: -1, almacenamiento: [] });;
  mediaType = MediaType;
  uid = 'ON58GOzM0zKIXeKDF9t9';

  constructor(
    private afs: AngularFirestore,
    private route: ActivatedRoute,
    private router: Router,
  ) { }
  ngOnInit() {

    this.score$ = this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) =>
          this.afs.doc<IScore>(`partituras/${params.get('uid')}`)
            .valueChanges()
        ),
        map(i => (new Score(i))
        ),
      );
  }
}
