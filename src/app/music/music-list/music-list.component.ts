import { Component, OnInit } from '@angular/core';
import { IScore, Score, IScoreId } from 'src/app/core/models';
import { iScore } from 'src/app/core/mock';
import { ScoreService } from 'src/app/core/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-music-list',
  templateUrl: './music-list.component.html',
  styleUrls: ['./music-list.component.scss'],
})
export class MusicListComponent implements OnInit {
  scores$: Observable<IScoreId[]>;
  constructor(
    private fbScore: ScoreService,
  ) {
    this.scores$ = this.fbScore.getScoreList();
  }
  ngOnInit() {
  }

}
