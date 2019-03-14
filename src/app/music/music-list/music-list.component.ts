import { Component, OnInit } from '@angular/core';
import { IScore, Score, IScoreId } from 'src/app/core/models';
import { iScore } from 'src/app/core/mock';
import { FirebaseService } from 'src/app/core/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-music-list',
  templateUrl: './music-list.component.html',
  styleUrls: ['./music-list.component.scss'],
})
export class MusicListComponent implements OnInit {
  scores$: Observable<IScoreId[]>;
  constructor(
    private db: FirebaseService
  ) {
    this.scores$ = this.db.getScoreList();
  }
  ngOnInit() {
  }

}
