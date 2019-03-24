import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { MediaTipo, OrigenTipo, IScore, Score, IScoreId } from '../../core/models';

import { From, OrcaState } from '../../core/store';

@Component({
  selector: 'app-music-detail',
  templateUrl: './music-detail.component.html',
  styleUrls: ['./music-detail.component.scss']
})
export class MusicDetailComponent implements OnInit, OnDestroy {
  media: { avatar: string; sheet: string; } = { avatar: '', sheet: '' };
  score: Score;
  isFav: boolean = false;
  @Input('score') iScore: IScoreId;
  @Input('userId') userId: string;
  constructor(private store: Store<OrcaState>) { }

  ngOnInit() {
    this.userId = '8uSyP89aa5a3w5AJ2jw8Xc2kvAG2'
    this.score = new Score(this.iScore);
    this.isFav = this.score.suscriptores.some(id => id === this.userId);
    // console.log(this.score);
  }
  ngOnDestroy() {

  }
  fav() {
    if (!this.isFav) {
      this.store.dispatch(new From.media.SaveFav({ scoreId: this.iScore.id, userId: '8uSyP89aa5a3w5AJ2jw8Xc2kvAG2' }));
      this.isFav = true;
    }
    else {
      this.store.dispatch(new From.media.DeleteFav({ scoreId: this.iScore.id, userId: '8uSyP89aa5a3w5AJ2jw8Xc2kvAG2' }));
      this.isFav = false;
    }
  }


}
