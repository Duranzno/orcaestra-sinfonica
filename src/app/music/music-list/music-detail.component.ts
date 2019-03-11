import { Component, OnInit, OnDestroy, Input } from '@angular/core';
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
export class MusicDetailComponent implements OnInit, OnDestroy {
  media: { avatar: string; sheet: string; } = { avatar: '', sheet: '' };
  @Input() score: Score;
  constructor() { }

  ngOnInit() {
  }
  ngOnDestroy() {

  }
}
