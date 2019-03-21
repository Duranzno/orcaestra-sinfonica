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
  @Input('score') iScore: IScoreId;
  constructor() { }

  ngOnInit() {
    this.score = new Score(this.iScore);
    console.log(this.score);
  }
  ngOnDestroy() {

  }
}
