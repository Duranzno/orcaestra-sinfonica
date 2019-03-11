import { Component, OnInit } from '@angular/core';
import { IScore, Score } from 'src/app/core/models';
import { iScore } from 'src/app/core/mock';

@Component({
  selector: 'app-music-list',
  templateUrl: './music-list.component.html',
  styleUrls: ['./music-list.component.scss'],
})
export class MusicListComponent implements OnInit {
  scores: any[] = [new Score(iScore)];
  constructor(

  ) {

  }
  ngOnInit() {
  }

}
