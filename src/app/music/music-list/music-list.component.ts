import { Component, OnInit, Input } from '@angular/core';
import { IScoreId } from 'src/app/core/models';
import { UIService } from 'src/app/core/services';

// fxFlex="0 1 calc(33.3% - 32px)" 
@Component({
  selector: 'app-music-list',
  template: `
  <div 
  fxLayout.lt-md="column" fxLayoutAlign.lt-md="center"
  fxLayout="row wrap" fxLayoutAlign="center center"
   fxLayoutGap="20px">
  <div *ngFor="let score of scores">
      <app-music-detail 
      [userId]="userId" [score]="score">
      </app-music-detail>
    </div>
    </div>
`,
  styleUrls: ['./music-list.component.scss', './music-detail.component.scss'],
})
export class MusicListComponent implements OnInit {
  @Input() scores: IScoreId[];
  @Input() userId: string;
  constructor(
    private ui: UIService
  ) { }
  ngOnInit() {
    if (!this.scores || this.scores.length === 0) {
      // this.ui.showSnackbar('No hay Obras Musicales de este tipo')
    }
  }
}
