import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { IScore, Score, MediaType } from 'src/app/core/models';
import { Observable, from, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { YoutubeService } from '../services';

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
  private scoreDoc: AngularFirestoreDocument<IScore>;
  score$: Observable<IScore>;
  score: Score;

  media: MediaBuffer = new MediaBuffer();
  mediaType = MediaType;
  partituraId = 'partituras/ON58GOzM0zKIXeKDF9t9';

  constructor(
    private afs: AngularFirestore,
    public youtube: YoutubeService) {
  }
  // update(score: IScore) {
  //   this.scoreDoc.update(score);
  // }
  ngOnInit() {
    this.scoreDoc = this.afs.doc<IScore>(this.partituraId);
    this.score$ = this.scoreDoc.valueChanges();
    this.score$.subscribe(s => {
      this.score = new Score(s);
      this.media.youtube = this.score
        .getByMedia(MediaType.YOUTUBE).pop()
        .originArray.pop()
        .url;
      console.log(this.youtube.urlParser(this.media.youtube));
      this.youtube.setup(this.youtube.urlParser(this.media.youtube));
    });
  }
}
