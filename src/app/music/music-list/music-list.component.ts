import { Component, OnInit, Input } from '@angular/core';
import { IScoreId } from 'src/app/core/models';


@Component({
  selector: 'app-music-list',
  template: `
    <div *ngFor="let score of scores " fxLayout="column" fxLayoutGap.gt-md="20px" fxLayoutAlign="center center">
      <app-music-detail [score]="score"></app-music-detail>
      <!-- {{ score | json }} -->
      <mat-divider [inset]="true"></mat-divider>
    </div>
`,
  styleUrls: ['./music-list.component.scss', './music-detail.component.scss'],
})
export class MusicListComponent implements OnInit {
  @Input() scores: IScoreId[];
  constructor(

  ) {
    console.log(this.scores)
  }
  ngOnInit() {
  }
}
