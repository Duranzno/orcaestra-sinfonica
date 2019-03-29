import { Component, OnInit, Input } from '@angular/core';
import { IScoreId } from 'src/app/core/models';
import { UIService } from 'src/app/core/services';


@Component({
  selector: 'app-music-list',
  template: `
    <div *ngFor="let score of scores" 
    fxLayout="column" fxLayoutGap.gt-md="20px" fxLayoutAlign="center center">
      <app-music-detail [userId]="userId" [score]="score"></app-music-detail>
      <!-- {{ score | json }} -->
      <mat-divider [inset]="true"></mat-divider>
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
      this.ui.showSnackbar('No hay Obras Musicales de este tipo')
    }
  }
}
