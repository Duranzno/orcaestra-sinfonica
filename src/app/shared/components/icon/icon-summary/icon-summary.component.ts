import { Component, OnInit, Input } from '@angular/core';
import { DataScore, IconElement } from 'src/app/core/models/data.score.model';

@Component({
  selector: 'app-icon-summary',
  template: `
  <div fxLayout="row" fxLayoutAlign="center center" fxLayoutGap="5px" >
  <mat-icon
  matTooltip="Info about the action"
  *ngFor="let i of array"
  [svgIcon]="i.icon">
</mat-icon>
  </div>
  `,
  styleUrls: ['./icon-summary.component.scss']
})
export class IconSummaryComponent implements OnInit {
  @Input('dataScoreArray') array: IconElement[] = [];
  constructor() { }

  ngOnInit() {
  }

}
